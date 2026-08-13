declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') {
    return;
  }

  const formattedProps: Record<string, string> = {};
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      formattedProps[key] = String(val);
    });
  }

  // Localhost logging
  if (window.location.hostname === 'localhost') {
    console.log(`[Analytics Dev] Event: ${eventName}`, formattedProps);
    return;
  }

  // 1. Plausible Track
  if (window.plausible) {
    try {
      window.plausible(eventName, { props: formattedProps });
    } catch (error) {
      console.error('Failed to log event to Plausible:', error);
    }
  }

  // 2. OpenPanel Track
  const win = window as unknown as { op?: (action: string, name?: string, properties?: Record<string, unknown>) => void };
  if (win.op) {
    try {
      win.op('track', eventName, formattedProps);
    } catch (error) {
      console.error('Failed to log event to OpenPanel:', error);
    }
  }
}
