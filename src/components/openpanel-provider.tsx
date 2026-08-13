'use client';

import { OpenPanelComponent } from '@openpanel/nextjs';

export function OpenPanelProvider() {
  const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;
  const apiUrl = process.env.NEXT_PUBLIC_OPENPANEL_API_URL;

  if (!clientId) {
    return null;
  }

  return (
    <OpenPanelComponent
      clientId={clientId}
      apiUrl={apiUrl}
      trackScreenViews={true}
      trackOutgoingLinks={true}
      trackAttributes={true}
      disabled={typeof window !== 'undefined' && window.location.hostname === 'localhost'}
    />
  );
}
