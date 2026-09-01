import { vertexShader, fragmentShader } from './shaders';

interface GlassEffectConfig {
  numDivisions?: number;
  autoMoveSpeed?: number;
  autoMoveAmplitude?: number;
  warpAmplitude?: number;
  displacementAmplitude?: number;
  mouseInfluence?: number;
  blurAmount?: number;
  desaturation?: number;
  textureScale?: number;
  mouseEase?: number;
}

const defaultConfig: Required<GlassEffectConfig> = {
  numDivisions: 20,
  autoMoveSpeed: 0.35,
  autoMoveAmplitude: 0.046,
  warpAmplitude: 0.022,
  displacementAmplitude: 0.005,
  mouseInfluence: 0.008,
  blurAmount: 0.009,
  desaturation: 0.12,
  textureScale: 1.0,
  mouseEase: 0.08,
};

export class GlassEffect {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private config: Required<GlassEffectConfig>;
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private targetMouseX = 0;
  private textureOffset = { x: 0, y: 0 };
  private targetTextureOffset = { x: 0, y: 0 };
  private animationFrame: number | null = null;
  private startTime = Date.now();
  private container: HTMLElement;
  private resizeTimeout: number | null = null;
  private isResizing = false;
  private isVisible = true;
  private visibilityObserver: IntersectionObserver | null = null;
  private lastFrameTime = 0;
  private readonly frameInterval = 1000 / 30;

  constructor(
    private canvas: HTMLCanvasElement,
    private image: HTMLImageElement,
    config: GlassEffectConfig = {}
  ) {
    this.config = { ...defaultConfig, ...config };
    this.container = canvas.closest('[data-glass-id]')?.parentElement || canvas.parentElement!;

    const gl = canvas.getContext('webgl', {
      premultipliedAlpha: false,
      alpha: true,
    });

    if (!gl) throw new Error('WebGL not supported');
    this.gl = gl;
    this.program = this.initShaders();
    this.initBuffers();
    this.initTexture();
    this.setupEventListeners();
    this.observeVisibility();
    this.resizeCanvas();
    this.render();
  }

  private initShaders(): WebGLProgram {
    const gl = this.gl;

    const vs = this.compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = this.compileShader(fragmentShader, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    if (!program) throw new Error('Failed to create program');

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Program linking failed');
    }

    gl.useProgram(program);

    const uniformNames = [
      'u_mouse',
      'u_resolution',
      'u_imageResolution',
      'u_time',
      'u_textureOffset',
      'u_textureScale',
      'u_numDivisions',
      'u_autoMoveSpeed',
      'u_autoMoveAmplitude',
      'u_warpAmplitude',
      'u_displacementAmplitude',
      'u_mouseInfluence',
      'u_blurAmount',
      'u_desaturation',
    ];

    uniformNames.forEach((name) => {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    });

    return program;
  }

  private compileShader(source: string, type: number): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Failed to create shader');

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compilation failed: ${error}`);
    }

    return shader;
  }

  private initBuffers(): void {
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

    this.createBuffer(positions, 'a_position', 2);
    this.createBuffer(texCoords, 'a_texCoord', 2);
  }

  private createBuffer(data: Float32Array, attribName: string, size: number): void {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const location = gl.getAttribLocation(this.program, attribName);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  }

  private initTexture(): void {
    const gl = this.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const updateTexture = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    };

    if (this.image.complete) {
      updateTexture();
    } else {
      this.image.onload = updateTexture;
    }
  }

  private setupEventListeners(): void {
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const mouseX = e.clientX - rect.left;

      this.targetMouseX = mouseX;

      const normalizedX = (mouseX - centerX) / centerX;
      this.targetTextureOffset.x = normalizedX * 0.05;
      this.targetTextureOffset.y = 0;
    });

    this.container.addEventListener('mouseleave', () => {
      this.targetMouseX = this.canvas.width / 2;
      this.targetTextureOffset.x = 0;
      this.targetTextureOffset.y = 0;
    });

    window.addEventListener(
      'resize',
      () => {
        this.isResizing = true;

        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = window.setTimeout(() => {
          this.resizeCanvas();
          this.isResizing = false;
        }, 150);
      },
      { passive: true }
    );
  }

  private resizeCanvas(): void {
    const container = this.canvas.parentElement;
    if (!container) return;

    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;
    this.currentX = this.mouseX;
    this.currentY = this.mouseY;
    this.targetMouseX = this.mouseX;
  }

  private observeVisibility(): void {
    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) this.lastFrameTime = 0;
      },
      { rootMargin: '100px 0px' }
    );
    this.visibilityObserver.observe(this.canvas);
  }

  private render = (timestamp = performance.now()): void => {
    this.animationFrame = requestAnimationFrame(this.render);

    if (!this.isVisible || document.hidden || this.isResizing) return;
    if (timestamp - this.lastFrameTime < this.frameInterval) return;
    this.lastFrameTime = timestamp;

    const gl = this.gl;
    const { config, uniforms } = this;

    this.mouseX += (this.targetMouseX - this.mouseX) * config.mouseEase;
    this.mouseY = this.canvas.height / 2;
    this.currentX += (this.mouseX - this.currentX) * config.mouseEase;
    this.currentY = this.canvas.height / 2;

    this.textureOffset.x += (this.targetTextureOffset.x - this.textureOffset.x) * 0.1;
    this.textureOffset.y = 0;

    gl.uniform2f(uniforms.u_mouse, this.currentX, this.currentY);
    gl.uniform2f(uniforms.u_resolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(uniforms.u_imageResolution, this.image.naturalWidth, this.image.naturalHeight);
    gl.uniform1f(uniforms.u_time, (Date.now() - this.startTime) * 0.001);
    gl.uniform2f(uniforms.u_textureOffset, this.textureOffset.x, this.textureOffset.y);

    gl.uniform1f(uniforms.u_textureScale, config.textureScale);
    gl.uniform1f(uniforms.u_numDivisions, config.numDivisions);
    gl.uniform1f(uniforms.u_autoMoveSpeed, config.autoMoveSpeed);
    gl.uniform1f(uniforms.u_autoMoveAmplitude, config.autoMoveAmplitude);
    gl.uniform1f(uniforms.u_warpAmplitude, config.warpAmplitude);
    gl.uniform1f(uniforms.u_displacementAmplitude, config.displacementAmplitude);
    gl.uniform1f(uniforms.u_mouseInfluence, config.mouseInfluence);
    gl.uniform1f(uniforms.u_blurAmount, config.blurAmount);
    gl.uniform1f(uniforms.u_desaturation, config.desaturation);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  public updateConfig(updates: Partial<GlassEffectConfig>): void {
    Object.assign(this.config, updates);
  }

  public setTextureOffset(x: number, y: number): void {
    this.textureOffset.x = x;
    this.textureOffset.y = y;
  }

  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.visibilityObserver?.disconnect();
    this.gl.deleteProgram(this.program);
  }
}
