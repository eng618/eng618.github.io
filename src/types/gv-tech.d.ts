/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@gv-tech/ui-web';
import * as React from 'react';

declare module '@gv-tech/ui-web' {
  export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
}
