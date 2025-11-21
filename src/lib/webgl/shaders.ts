export const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

export const fragmentShader = `
  precision mediump float;

  uniform sampler2D u_image;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform float u_time;
  uniform vec2 u_textureOffset;
  uniform float u_textureScale;

  uniform float u_numDivisions;
  uniform float u_autoMoveSpeed;
  uniform float u_autoMoveAmplitude;
  uniform float u_warpAmplitude;
  uniform float u_displacementAmplitude;
  uniform float u_mouseInfluence;
  uniform float u_blurAmount;
  uniform float u_desaturation;

  varying vec2 v_texCoord;

  const float PI = 3.14159265359;

  void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;

    float stripeX = uv.x * u_numDivisions;
    float stripeID = floor(stripeX);
    float stripeLocal = fract(stripeX);

    float autoMove = sin(u_time * u_autoMoveSpeed) * u_autoMoveAmplitude;

    float warpX = sin(stripeLocal * PI * 1.5 + uv.y * PI + u_time * 0.08) * u_warpAmplitude;
    float warpY = cos(stripeLocal * PI * 0.8 + uv.y * PI * 1.3 + u_time * 0.07) * u_warpAmplitude;

    float warpedX = stripeLocal + warpX;
    float warpedY = uv.y + warpY;

    float thickness = sin(warpedX * PI * 2.5 + warpedY * PI * 1.8 + u_time * 0.05) * 0.5 + 0.5;
    float thicknessFactor = 1.0 + thickness * 1.5;

    float displaceX = sin(warpedX * PI * 8.0 + warpedY * PI * 5.0 + u_time * 0.1) * u_displacementAmplitude;
    float displaceY = cos(warpedX * PI * 6.0 - warpedY * PI * 10.0 + stripeID * 0.7 + u_time * 0.08) * u_displacementAmplitude * 0.2;

    vec2 mouseFlow = (vec2(0.5, 0.5) - mouse) * 3.0;

    vec2 refraction = vec2(
      displaceX + mouseFlow.x * u_mouseInfluence + autoMove,
      displaceY + mouseFlow.y * u_mouseInfluence * 0.5
    ) * thicknessFactor;

    vec2 sampledUV = uv + refraction;
    sampledUV += u_textureOffset;

    vec2 center = vec2(0.5, 0.5);
    sampledUV = center + (sampledUV - center) * u_textureScale;

    // Calculate aspect ratio correction to maintain image proportions (object-cover behavior)
    float canvasAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageResolution.x / u_imageResolution.y;

    // Calculate the ratio of aspects
    float aspectRatio = canvasAspect / imageAspect;

    // For cover behavior, we need to SHRINK the UV sampling area (zoom in)
    // This means DIVIDING the UV offset to sample less of the image
    vec2 scale = vec2(1.0);

    if (aspectRatio > 1.0) {
      // Canvas wider than image - image fills width, crop top/bottom
      scale.y = aspectRatio;
    } else {
      // Canvas taller than image - image fills height, crop left/right
      scale.x = 1.0 / aspectRatio;
    }

    // Apply the scale by DIVIDING to zoom in (sample less of the image)
    vec2 aspectCorrectedUV = vec2(
      0.5 + (sampledUV.x - 0.5) / scale.x,
      0.5 + (sampledUV.y - 0.5) / scale.y
    );

    sampledUV = aspectCorrectedUV;

    vec3 color = vec3(0.0);

    // Multi-sample blur
    color += texture2D(u_image, sampledUV).rgb * 0.20;
    color += texture2D(u_image, sampledUV + vec2(cos(0.0), sin(0.0)) * u_blurAmount).rgb * 0.13;
    color += texture2D(u_image, sampledUV + vec2(cos(1.571), sin(1.571)) * u_blurAmount).rgb * 0.13;
    color += texture2D(u_image, sampledUV + vec2(cos(3.142), sin(3.142)) * u_blurAmount).rgb * 0.13;
    color += texture2D(u_image, sampledUV + vec2(cos(4.712), sin(4.712)) * u_blurAmount).rgb * 0.13;
    color += texture2D(u_image, sampledUV + vec2(cos(0.785), sin(0.785)) * u_blurAmount * 0.7).rgb * 0.07;
    color += texture2D(u_image, sampledUV + vec2(cos(2.356), sin(2.356)) * u_blurAmount * 0.7).rgb * 0.07;
    color += texture2D(u_image, sampledUV + vec2(cos(3.927), sin(3.927)) * u_blurAmount * 0.7).rgb * 0.07;
    color += texture2D(u_image, sampledUV + vec2(cos(5.498), sin(5.498)) * u_blurAmount * 0.7).rgb * 0.07;

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(gray), u_desaturation);

    // Apply violet tint with multiply blend (#C4B5FD at 30% opacity)
    vec3 violetTint = vec3(0.769, 0.710, 0.992);
    color.rgb = mix(color.rgb, color.rgb * violetTint, 0.6);

    gl_FragColor = vec4(color, 1.0);
  }
`;
