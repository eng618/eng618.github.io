'use client';

import { Card, CardContent } from '@gv-tech/ui-web';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { GameCanvas } from '@/components/not-found/GameCanvas';
import { GameViewport } from '@/components/not-found/GameViewport';
import { NotFoundCard } from '@/components/not-found/NotFoundCard';
import { TerminalOverlay } from '@/components/not-found/TerminalOverlay';
import { useLinterInvaders } from '@/components/not-found/useLinterInvaders';

export default function NotFoundPage() {
  const {
    gameActive,
    highScore,
    soundRef,
    detonateRef,
    scoreRef,
    isGameOverRef,
    highScoreRef,
    launchGame,
    collapseGame,
    handleExitClick,
    handleKill,
    handleLevelClear,
    handleLifeLost,
    handlePowerUp,
    handleBomb,
    handleFirstShot,
    handleGameOver,
    handleReboot,
  } = useLinterInvaders();

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
      <main className={`bg-background flex-grow transition-all duration-500 ${gameActive ? 'py-8' : 'py-24'}`}>
        <div className={`container mx-auto px-4 transition-all duration-500 lg:px-8 ${gameActive ? 'max-w-6xl' : ''}`}>
          <div className={`mx-auto transition-all duration-500 ${gameActive ? 'max-w-6xl' : 'max-w-3xl'}`}>
            <Card
              className={`bg-card border-border rounded-2xl border shadow-sm transition-all duration-500 ${
                gameActive ? 'p-2 md:p-4' : 'p-8 md:p-12'
              }`}
            >
              {!gameActive && <NotFoundCard onExit={handleExitClick} />}

              <CardContent className={gameActive ? 'p-0' : ''}>
                {gameActive && (
                  <p className="mb-3 text-center font-mono text-sm text-green-400/80">
                    Debugger Protocol engaged — defend the terminal. B to detonate, ESC to minimize.
                  </p>
                )}
                <GameViewport
                  active={gameActive}
                  highScore={highScore}
                  onCollapse={collapseGame}
                  onDetonate={() => {
                    detonateRef.current += 1;
                  }}
                >
                  <TerminalOverlay visible={!gameActive} onLaunch={() => launchGame('click')} />
                  {gameActive && (
                    <GameCanvas
                      soundRef={soundRef}
                      detonateRef={detonateRef}
                      scoreRef={scoreRef}
                      isGameOverRef={isGameOverRef}
                      highScoreRef={highScoreRef}
                      onKill={handleKill}
                      onLevelClear={handleLevelClear}
                      onLifeLost={handleLifeLost}
                      onPowerUp={handlePowerUp}
                      onBomb={handleBomb}
                      onFirstShot={handleFirstShot}
                      onGameOver={handleGameOver}
                      onReboot={handleReboot}
                    />
                  )}
                </GameViewport>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
