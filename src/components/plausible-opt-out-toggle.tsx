'use client';

import { usePlausibleOptOut } from '@/hooks/use-plausible-opt-out';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { useEffect, useState } from 'react';

export function PlausibleOptOutToggle() {
  const { isOptedOut, toggleOptOut } = usePlausibleOptOut();
  const [mounted, setMounted] = useState(false);
  const [optedOut, setOptedOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOptedOut(isOptedOut());
  }, [isOptedOut]);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    toggleOptOut();
    setOptedOut(!optedOut);
  };

  return (
    <Card className="border-border bg-muted/50">
      <CardHeader>
        <CardTitle className="text-foreground">Analytics Opt-out</CardTitle>
        <CardDescription>
          {optedOut
            ? 'You are currently opted out of analytics tracking.'
            : 'You are currently included in analytics tracking.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="default"
          onClick={handleToggle}
          aria-label={optedOut ? 'Opt in to analytics' : 'Opt out of analytics'}
        >
          {optedOut ? 'Opt In' : 'Opt Out'}
        </Button>
      </CardContent>
    </Card>
  );
}
