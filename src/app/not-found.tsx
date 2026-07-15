'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button, Card, CardContent, CardHeader, CardTitle, Label, Separator } from '@gv-tech/ui-web';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Analytics helper to safely send events to Plausible
const trackEvent = (eventName: string, props?: Record<string, string | number | boolean>) => {
  const formattedProps: Record<string, string> = {};
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      formattedProps[key] = String(val);
    });
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log(`[Analytics Dev] Event: ${eventName}`, formattedProps);
    return;
  }

  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: formattedProps });
  }
};

class SoundSynth {
  private ctx: AudioContext | null = null;

  init() {
    if (typeof window === 'undefined') {
      return;
    }
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playShoot() {
    if (!this.ctx || this.ctx.state === 'suspended') {
      return;
    }
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playExplosion() {
    if (!this.ctx || this.ctx.state === 'suspended') {
      return;
    }
    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playGameOver() {
    if (!this.ctx || this.ctx.state === 'suspended') {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [500, 380, 290, 190];
      const duration = 0.15;

      tones.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * duration);

        gain.gain.setValueAtTime(0.08, now + idx * duration);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * duration - 0.01);

        osc.start(now + idx * duration);
        osc.stop(now + (idx + 1) * duration);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playReboot() {
    if (!this.ctx || this.ctx.state === 'suspended') {
      return;
    }
    try {
      const now = this.ctx.currentTime;
      const tones = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
      const duration = 0.08;

      tones.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * duration);

        gain.gain.setValueAtTime(0.05, now + idx * duration);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * duration - 0.01);

        osc.start(now + idx * duration);
        osc.stop(now + (idx + 1) * duration);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }
}

export default function NotFoundPage() {
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const soundSynth = useRef<SoundSynth | null>(null);

  const scoreRef = useRef(0);
  const isGameOverRef = useRef(false);
  const highScoreRef = useRef(highScore);

  // Tracking refs to avoid double counting and measure user journey
  const hasTrackedViewRef = useRef(false);
  const gameStartTimeRef = useRef(0);
  const rebootCountRef = useRef(0);
  const hasFiredShotRef = useRef(false);
  const hasTrackedMilestoneRef = useRef(false);

  // Sync state to ref
  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  // Load high score and track 404 pageview
  useEffect(() => {
    if (!hasTrackedViewRef.current) {
      trackEvent('404 Page View', {
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        broken_url: typeof window !== 'undefined' ? window.location.pathname : '',
      });
      hasTrackedViewRef.current = true;
    }

    soundSynth.current = new SoundSynth();
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linter_invaders_high_score');
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  // Listen to Spacebar to launch game
  useEffect(() => {
    if (gameActive) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        launchGame('spacebar');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);

  const launchGame = (triggerType: 'spacebar' | 'click') => {
    if (soundSynth.current) {
      soundSynth.current.init();
      soundSynth.current.playReboot();
    }
    setGameActive(true);
    gameStartTimeRef.current = Date.now();
    trackEvent('Game Launch', { trigger: triggerType });
  };

  const handleExitClick = (destination: string) => {
    trackEvent('404 Exit', {
      destination,
      played_game: gameActive ? 'true' : 'false',
    });
  };

  // Game initialization & loop
  useEffect(() => {
    if (!gameActive) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;

    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      KeyA: false,
      KeyD: false,
      Space: false,
    };

    let useMouse = false;

    const player = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 40,
      speed: 8,
    };

    const projectiles: Array<{ x: number; y: number; vy: number }> = [];
    let lastShootTime = 0;
    const shootCooldown = 220; // ms

    const enemies: Array<{
      x: number;
      y: number;
      type: string;
      color: string;
      speed: number;
      width: number;
    }> = [];
    let lastSpawnTime = 0;

    const enemyTypes = [
      { text: '✗', color: '#FF3333', width: 20 },
      { text: '⚠', color: '#FFAA00', width: 20 },
      { text: '[!]', color: '#FF3333', width: 35 },
      { text: 'null', color: '#FFAA00', width: 40 },
    ];

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      char: string;
      color: string;
      alpha: number;
    }> = [];

    const resetGame = (triggerType: 'enter' | 'click') => {
      projectiles.length = 0;
      enemies.length = 0;
      particles.length = 0;
      scoreRef.current = 0;
      isGameOverRef.current = false;
      player.x = CANVAS_WIDTH / 2;
      lastSpawnTime = Date.now();

      rebootCountRef.current += 1;
      gameStartTimeRef.current = Date.now();
      hasFiredShotRef.current = false;
      hasTrackedMilestoneRef.current = false;

      trackEvent('Game Reboot', { trigger: triggerType });

      if (soundSynth.current) {
        soundSynth.current.playReboot();
      }
    };

    const shoot = () => {
      const now = Date.now();
      if (now - lastShootTime >= shootCooldown) {
        projectiles.push({
          x: player.x,
          y: player.y - 15,
          vy: -10,
        });
        lastShootTime = now;
        if (soundSynth.current) {
          soundSynth.current.playShoot();
        }

        if (!hasFiredShotRef.current) {
          trackEvent('First Shot', { trigger: useMouse ? 'click' : 'spacebar' });
          hasFiredShotRef.current = true;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keys.ArrowLeft = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keys.ArrowRight = true;
      }
      if (e.code === 'Space') {
        keys.Space = true;
      }

      if (isGameOverRef.current && e.code === 'Enter') {
        e.preventDefault();
        resetGame('enter');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keys.ArrowLeft = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keys.ArrowRight = false;
      }
      if (e.code === 'Space') {
        keys.Space = false;
      }
    };

    const getCanvasMousePos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * CANVAS_WIDTH;
      const y = ((clientY - rect.top) / rect.height) * CANVAS_HEIGHT;
      return { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      useMouse = true;
      const pos = getCanvasMousePos(e.clientX, e.clientY);
      player.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, pos.x));
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (soundSynth.current) {
        soundSynth.current.init();
      }
      if (isGameOverRef.current) {
        resetGame('click');
        return;
      }
      useMouse = true;
      const pos = getCanvasMousePos(e.clientX, e.clientY);
      player.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, pos.x));
      shoot();
    };

    const handleTouchMove = (e: TouchEvent) => {
      useMouse = true;
      if (e.touches.length > 0) {
        const pos = getCanvasMousePos(e.touches[0].clientX, e.touches[0].clientY);
        player.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, pos.x));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (soundSynth.current) {
        soundSynth.current.init();
      }
      if (isGameOverRef.current) {
        resetGame('click');
        return;
      }
      useMouse = true;
      if (e.touches.length > 0) {
        const pos = getCanvasMousePos(e.touches[0].clientX, e.touches[0].clientY);
        player.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, pos.x));
        shoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });

    let animationFrameId: number;

    const spawnExplosion = (x: number, y: number, color: string) => {
      const count = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const char = Math.random() > 0.5 ? '0' : '1';
        const particleColor = Math.random() > 0.4 ? '#00FF00' : color;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char,
          color: particleColor,
          alpha: 1.0,
        });
      }
    };

    const triggerGameOver = () => {
      isGameOverRef.current = true;
      if (soundSynth.current) {
        soundSynth.current.playGameOver();
      }

      // Track game over stats and duration
      const duration = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);
      trackEvent('Game Over', {
        score: scoreRef.current,
        high_score: highScoreRef.current,
        duration_seconds: duration,
        reboot_count: rebootCountRef.current,
      });
    };

    const update = () => {
      if (isGameOverRef.current) {
        return;
      }

      // 1. Player movement
      if (!useMouse || keys.ArrowLeft || keys.ArrowRight) {
        if (keys.ArrowLeft) {
          player.x = Math.max(20, player.x - player.speed);
        }
        if (keys.ArrowRight) {
          player.x = Math.min(CANVAS_WIDTH - 20, player.x + player.speed);
        }
      }

      // 2. Shooting
      if (keys.Space) {
        shoot();
      }

      // 3. Spawning
      const now = Date.now();
      const score = scoreRef.current;
      const spawnInterval = Math.max(350, 1500 - score * 8);
      if (now - lastSpawnTime >= spawnInterval) {
        const typeIndex = Math.floor(Math.random() * enemyTypes.length);
        const type = enemyTypes[typeIndex];
        const enemySpeed = (1.5 + Math.min(3.5, score * 0.006)) * (0.8 + Math.random() * 0.4);
        enemies.push({
          x: Math.max(40, Math.min(CANVAS_WIDTH - 40, Math.random() * CANVAS_WIDTH)),
          y: -20,
          type: type.text,
          color: type.color,
          speed: enemySpeed,
          width: type.width,
        });
        lastSpawnTime = now;
      }

      // 4. Update projectiles
      for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].y += projectiles[i].vy;
        if (projectiles[i].y < 0) {
          projectiles.splice(i, 1);
        }
      }

      // 5. Update enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemy.speed;

        // Bottom collision
        if (enemy.y >= CANVAS_HEIGHT - 20) {
          triggerGameOver();
          return;
        }

        // Player collision
        if (Math.abs(enemy.x - player.x) < enemy.width / 2 + 15 && Math.abs(enemy.y - player.y) < 20) {
          triggerGameOver();
          return;
        }
      }

      // 6. Projectile vs Enemy collisions
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        for (let j = enemies.length - 1; j >= 0; j--) {
          const e = enemies[j];
          const hitX = Math.abs(p.x - e.x) < e.width / 2 + 10;
          const hitY = Math.abs(p.y - e.y) < 18;

          if (hitX && hitY) {
            spawnExplosion(e.x, e.y, e.color);
            if (soundSynth.current) {
              soundSynth.current.playExplosion();
            }

            projectiles.splice(i, 1);
            enemies.splice(j, 1);

            scoreRef.current += 10;

            // Track milestone goal when score reaches 100 for the first time
            if (scoreRef.current >= 100 && !hasTrackedMilestoneRef.current) {
              trackEvent('Clean Build Milestone', {
                score: scoreRef.current,
                high_score: highScoreRef.current,
              });
              hasTrackedMilestoneRef.current = true;
            }

            if (scoreRef.current > highScoreRef.current) {
              const newHigh = scoreRef.current;
              setHighScore(newHigh);
              localStorage.setItem('linter_invaders_high_score', newHigh.toString());
            }
            break;
          }
        }
      }

      // 7. Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const part = particles[i];
        part.x += part.vx;
        part.y += part.vy;
        part.alpha -= 0.03;
        if (part.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (isGameOverRef.current) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#FF3333';
        ctx.font = 'bold 36px monospace';
        ctx.fillText('FATAL ERROR: Stack Overflow.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

        ctx.fillStyle = '#FFAA00';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('Process exited with code 404.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        ctx.fillStyle = '#00FF00';
        ctx.font = '20px monospace';

        const blink = Math.floor(Date.now() / 500) % 2 === 0;
        if (blink) {
          ctx.fillText('Press ENTER or Click to reboot compiler.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px monospace';
        ctx.fillText(
          `Resolved: ${scoreRef.current}  |  Cleanest: ${highScoreRef.current}`,
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 + 130,
        );
        return;
      }

      // Background title
      ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LINTER INVADERS - TERMINAL DEFENSE PROTOCOL', CANVAS_WIDTH / 2, 25);

      // Player
      ctx.fillStyle = '#00FF00';
      ctx.font = 'bold 32px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('>', player.x, player.y);

      // Projectiles
      ctx.font = 'bold 26px monospace';
      for (const p of projectiles) {
        ctx.fillText(';', p.x, p.y);
      }

      // Enemies
      ctx.font = 'bold 26px monospace';
      for (const e of enemies) {
        ctx.fillStyle = e.color;
        ctx.fillText(e.type, e.x, e.y);
      }

      // Particles
      ctx.font = '12px monospace';
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      // HUD
      ctx.fillStyle = '#00FF00';
      ctx.font = '18px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`Errors Resolved: ${scoreRef.current}`, 20, 20);

      ctx.textAlign = 'right';
      ctx.fillText(`Cleanest Build: ${highScoreRef.current}`, CANVAS_WIDTH - 20, 20);
    };

    const tick = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(tick);
    };

    lastSpawnTime = Date.now();
    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, [gameActive]);

  return (
    <div className="flex min-h-screen flex-col">
      <style>{`
        @keyframes terminal-blink-key {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-blink {
          animation: terminal-blink-key 1.2s step-end infinite;
        }
      `}</style>
      <Header />
      <main className="bg-background flex-grow py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Card className="bg-card border-border rounded-2xl border p-8 shadow-sm md:p-12">
              <CardHeader>
                <div className="flex items-center justify-center">
                  <Terminal className="text-primary h-12 w-12" aria-hidden />
                </div>
                <CardTitle className="mt-6 mb-2 text-center font-mono text-4xl font-bold md:text-5xl">
                  404: Build Failed
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 text-center">
                  Relax, it’s not your fault. This route was always a bad idea.
                </p>

                <div className="prose mx-auto mb-6 text-center">
                  <p>The page you requested threw an unhandled exception during deployment.</p>
                  <p>Don’t worry, even senior devs ship broken routes sometimes.</p>
                  <p>You can:</p>
                </div>

                <div className="mb-6 flex flex-col items-center gap-6 md:flex-row md:flex-nowrap md:justify-center md:gap-4">
                  <div className="flex w-full flex-col items-center gap-2 md:w-auto">
                    <Label htmlFor="home-button" className="text-muted-foreground text-center text-sm">
                      Roll back to a stable release
                    </Label>
                    <Button
                      variant="default"
                      asChild
                      className="w-full items-stretch md:w-auto"
                      onClick={() => handleExitClick('home')}
                    >
                      <Link href="/" className="flex h-full flex-col justify-center px-4 py-3 text-center">
                        <span className="block break-words whitespace-normal">Go to Home</span>
                      </Link>
                    </Button>
                  </div>

                  <Separator orientation="vertical" className="hidden h-20 md:block" />

                  <div className="flex w-full flex-col items-center gap-2 md:w-auto">
                    <Label htmlFor="portfolio-button" className="text-muted-foreground text-center text-sm">
                      Inspect the logs
                    </Label>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full items-stretch md:w-auto"
                      onClick={() => handleExitClick('projects')}
                    >
                      <Link href="/portfolio" className="flex h-full flex-col justify-center px-4 py-3 text-center">
                        <span className="block break-words whitespace-normal">View Projects</span>
                      </Link>
                    </Button>
                  </div>

                  <Separator orientation="vertical" className="hidden h-20 md:block" />

                  <div className="flex w-full flex-col items-center gap-2 md:w-auto">
                    <Label htmlFor="contact-button" className="text-muted-foreground text-center text-sm">
                      Open a new issue
                    </Label>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full items-stretch md:w-auto"
                      onClick={() => handleExitClick('contact')}
                    >
                      <Link href="/contact" className="flex h-full flex-col justify-center px-4 py-3 text-center">
                        <span className="block break-words whitespace-normal">Contact Me</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative mt-6 h-[450px] w-full overflow-hidden rounded-lg border border-green-500/20 bg-black shadow-lg">
                  {/* Static terminal output */}
                  <div
                    className={`absolute inset-0 overflow-auto bg-black p-6 font-mono text-sm text-green-400 transition-opacity duration-500 ${
                      gameActive ? 'pointer-events-none opacity-0' : 'opacity-100'
                    }`}
                  >
                    <pre className="leading-relaxed whitespace-pre-wrap select-none">
                      {`> npm run build

✔ Compiling portfolio...
✖ Error: Route "/this-page" not found
   at router.ts:42:13
   Hint: Try navigating to "/"

Build failed with 1 error and 0 regrets.

// P.S. If you got here on purpose,
// we should probably work together.
`}
                      <span
                        onClick={() => launchGame('click')}
                        className="terminal-blink mt-4 block cursor-pointer font-bold text-green-400 hover:underline"
                      >
                        {`// Press SPACE (or click here) to launch Debugger Protocol...`}
                      </span>
                    </pre>
                  </div>

                  {/* Canvas element */}
                  <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 h-full w-full bg-black transition-opacity duration-500 ${
                      gameActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                    width={800}
                    height={600}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
