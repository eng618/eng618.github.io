'use client';

interface TerminalOverlayProps {
  visible: boolean;
  onLaunch: () => void;
}

export function TerminalOverlay({ visible, onLaunch }: TerminalOverlayProps) {
  return (
    <div
      className={`absolute inset-0 overflow-auto bg-black p-6 font-mono text-sm text-green-400 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!visible}
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
        <button
          type="button"
          onClick={onLaunch}
          className="terminal-blink mt-4 block cursor-pointer text-left font-bold text-green-400 hover:underline"
        >
          {`// Press SPACE (or click here) to launch Debugger Protocol...`}
        </button>
      </pre>
    </div>
  );
}
