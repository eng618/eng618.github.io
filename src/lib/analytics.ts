export type AnalyticsEventName =
  | 'Contact Form Started'
  | 'Contact Form Submitted'
  | 'Contact Form Success'
  | 'Contact Form Error'
  | 'Cover Letter View'
  | 'Cover Letter Print'
  | 'Cover Letter Resume Click'
  | 'Cover Letter Error'
  | 'Code Snippet Copied'
  | 'Notes Search'
  | 'Edit on GitHub Click'
  | 'Credential Lightbox Opened'
  | 'Credential External Verify Click'
  | 'Hero CTA Click'
  | 'Footer Social Click'
  | '404 Page View'
  | 'Game Launch'
  | 'Game Reboot'
  | 'First Shot'
  | 'Game Over'
  | 'Clean Build Milestone'
  | '404 Exit'
  | 'Resume Tab Toggle'
  | 'Resume Print'
  | 'Resume Contact Click'
  | (string & {});

export function trackEvent(eventName: AnalyticsEventName, props?: Record<string, string | number | boolean>) {
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

  // OpenPanel Track
  const win = window as unknown as {
    op?: (action: string, name?: string, properties?: Record<string, unknown>) => void;
  };
  if (win.op) {
    try {
      win.op('track', eventName, formattedProps);
    } catch (error) {
      console.error('Failed to log event to OpenPanel:', error);
    }
  }
}
