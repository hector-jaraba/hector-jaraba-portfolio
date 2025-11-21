/**
 * Console Easter Egg
 * Fun ASCII art and message for curious developers
 */

export function showConsoleMessage() {
  // Don't show in production to keep console clean (optional)
  // if (import.meta.env.PROD) return;

  const styles = {
    title: 'color: #00bfa6; font-size: 16px; font-weight: bold;',
    subtitle: 'color: #6bd3ff; font-size: 14px;',
    text: 'color: #99a1ad; font-size: 13px;',
    highlight: 'color: #00bfa6; font-weight: bold;',
    link: 'color: #6bd3ff; text-decoration: underline;',
    ascii: 'color: #00bfa6; font-family: monospace; line-height: 1.2;',
    warning: 'color: #ff6b6b; font-size: 14px; font-weight: bold;',
  };

  // Clear console for dramatic effect (optional)
  console.clear();

  // ASCII Art
  console.log(
    '%c' +
      `
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║     ██╗  ██╗███████╗██╗     ██╗      ██████╗             ║
   ║     ██║  ██║██╔════╝██║     ██║     ██╔═══██╗            ║
   ║     ███████║█████╗  ██║     ██║     ██║   ██║            ║
   ║     ██╔══██║██╔══╝  ██║     ██║     ██║   ██║            ║
   ║     ██║  ██║███████╗███████╗███████╗╚██████╔╝            ║
   ║     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝             ║
   ║                                                           ║
   ║              🚀 Welcome, Fellow Developer! 🚀             ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
  `,
    styles.ascii
  );

  console.log('\n');

  // Welcome message
  console.log(
    '%c👋 Hey there, code detective!',
    'color: #00bfa6; font-size: 20px; font-weight: bold;'
  );

  console.log('\n');

  console.log(
    "%cI see you're peeking under the hood... %cI like your style! 😎",
    styles.text,
    styles.highlight
  );

  console.log('\n');

  // Fun facts
  console.log('%c📊 Fun Stats About This Site:', styles.subtitle);
  console.log('%c  • Built with: %cAstro + TypeScript + GSAP', styles.text, styles.highlight);
  console.log('%c  • WebGL effects: %cCustom shaders', styles.text, styles.highlight);
  console.log('%c  • Coffee consumed: %c∞', styles.text, styles.highlight);

  console.log('\n');

  // Easter eggs
  console.log('%c🎮 Try These Console Commands:', styles.subtitle);
  console.log('%c  • %cwhoami()%c - Learn more about me', styles.text, styles.link, styles.text);
  console.log("%c  • %chireMe()%c - Let's work together!", styles.text, styles.link, styles.text);
  console.log('%c - Try the Konami code (↑ ↑ ↓ ↓ ← → ← → b a) in the page!', styles.text);

  console.log('\n');

  // Call to action
  console.log('%c💼 Looking for a Senior Frontend Engineer?', styles.title);
  console.log(
    '%cI specialize in React, TypeScript, and building delightful user experiences.',
    styles.text
  );
  console.log('\n');
  console.log("%c📫 Let's connect:", styles.subtitle);
  console.log('%c  LinkedIn: %chttps://linkedin.com/in/hjaraba', styles.text, styles.link);
  console.log('%c  Email:    %chi@hectorjaraba.com', styles.text, styles.link);

  // Add interactive console commands
  setupConsoleCommands();
}

function setupConsoleCommands() {
  // whoami command
  (window as any).whoami = function () {
    console.clear();
    console.log('%c👨‍💻 Héctor Jaraba', 'color: #00bfa6; font-size: 24px; font-weight: bold;');
    console.log('\n');
    console.log('%c🎯 Senior Frontend Engineer', 'color: #6bd3ff; font-size: 16px;');
    console.log('\n');
    console.log(
      '%cI build high-performance, scalable web applications with a focus on:',
      'color: #99a1ad; font-size: 14px;'
    );
    console.log('%c  • Modern architectures', 'color: #99a1ad;');
    console.log('%c  • Best practices', 'color: #99a1ad;');
    console.log('%c  • Performance optimization', 'color: #99a1ad;');
    console.log('%c  • Delightful animations & interactions', 'color: #99a1ad;');
    console.log('%c  • Mentoring & code reviews', 'color: #99a1ad;');
    console.log('\n');
    console.log('%c🛠️  Tech Stack', 'color: #00bfa6; font-size: 24px; font-weight: bold;');
    console.log('\n');

    const skills = {
      '⚛️  Frontend': ['React', 'Vue', 'Astro', 'TypeScript', 'Next.js'],
      '🎨 Styling': ['Tailwind', 'CSS-in-JS', 'SASS', 'Styled Components'],
      '🎬 Animation': ['GSAP', 'Lenis', 'WebGL/Three.js'],
      '🔧 Tools': ['Git', 'Webpack', 'Vite', 'ESLint', 'Prettier'],
      '🧪 Testing': ['Jest', 'React Testing Library', 'Playwright', 'Cypress'],
      '☁️  Other': ['Node.js', 'REST APIs', 'GraphQL', 'CI/CD'],
    };

    Object.entries(skills).forEach(([category, techs]) => {
      console.log(`%c${category}:`, 'color: #6bd3ff; font-size: 16px; font-weight: bold;');
      techs.forEach((tech) => {
        console.log(`  %c✓ ${tech}`, 'color: #00bfa6;');
      });
      console.log('\n');
    });

    console.log('%c💡 Always learning, always improving!', 'color: #99a1ad; font-style: italic;');
  };

  // hireMe command
  (window as any).hireMe = function () {
    console.clear();
    console.log(
      "%c🚀 Let's Build Something Amazing!",
      'color: #00bfa6; font-size: 24px; font-weight: bold;'
    );
    console.log('\n');
    console.log("%cI'm available for:", 'color: #6bd3ff; font-size: 16px;');
    console.log('%c  ✓ Full-time positions', 'color: #99a1ad;');
    console.log('\n');
    console.log('%c📧 Reach out:', 'color: #6bd3ff; font-size: 16px;');
    console.log('%c  Email:    hi@hectorjaraba.com', 'color: #00bfa6;');
    console.log('%c  LinkedIn: https://linkedin.com/in/hjaraba', 'color: #00bfa6;');
    console.log('\n');
    console.log(
      '%c⚡ Response time: Usually within 24 hours',
      'color: #99a1ad; font-style: italic;'
    );
    console.log('\n');
    console.log(
      '%c💬 "The best way to predict the future is to build it."',
      'color: #6bd3ff; font-style: italic;'
    );
  };

  // Konami code easter egg
  (window as any).konami = function () {
    console.clear();
    console.clear();
    const colors = ['#00bfa6', '#6bd3ff', '#ff6b6b', '#ffd93d', '#6bcf7f'];
    let i = 0;

    const interval = setInterval(() => {
      console.clear();
      console.log(
        `%c🎉 ${' '.repeat(i % 20)} PARTY TIME! ${' '.repeat((20 - i) % 20)} 🎉`,
        `color: ${colors[i % colors.length]}; font-size: 24px; font-weight: bold;`
      );
      i++;

      if (i > 20) {
        clearInterval(interval);
        console.clear();
        console.log(
          '%c🎊 Thanks for being awesome!',
          'color: #00bfa6; font-size: 20px; font-weight: bold;'
        );
        console.log('\n');
        console.log('%c🎁 Your reward: Maximum respect', 'color: #00bfa6;');
        console.log('\n');
        console.log('%cNow back to coding... 💻', 'color: #99a1ad;');
      }
    }, 100);
  };

  // Log available commands
  console.log('\n');
  console.log(
    '%c💡 Tip: Type any of the commands above to try them!',
    'color: #6bd3ff; font-style: italic;'
  );

  // Setup actual Konami code keyboard listener
  setupKonamiCodeListener();
}

/**
 * Setup keyboard listener for the actual Konami code sequence
 */
function setupKonamiCodeListener() {
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ];

  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    // Check if the pressed key matches the next key in the sequence
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;

      // If the entire sequence is completed
      if (konamiIndex === konamiCode.length) {
        // Trigger the konami easter egg
        (window as any).konami();

        // Add visual feedback - infinite rainbow animation using overlay
        // This approach doesn't break scroll animations
        if (!document.getElementById('konami-overlay')) {
          // Create overlay element
          const overlay = document.createElement('div');
          overlay.id = 'konami-overlay';
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            background: linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080);
            background-size: 400% 400%;
            mix-blend-mode: overlay;
            opacity: 0.3;
            animation: rainbow-gradient 3s linear infinite;
          `;
          document.body.appendChild(overlay);

          // Add animation keyframes if not exists
          if (!document.getElementById('konami-style')) {
            const style = document.createElement('style');
            style.id = 'konami-style';
            style.textContent = `
              @keyframes rainbow-gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `;
            document.head.appendChild(style);
          }
        }

        // Reset the sequence
        konamiIndex = 0;
      }
    } else {
      // Wrong key pressed, reset the sequence
      konamiIndex = 0;
    }
  });
}
