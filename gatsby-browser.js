import './src/styles/index.scss';

// eslint-disable-next-line import/prefer-default-export
export const onServiceWorkerUpdateReady = () => {
  // eslint-disable-next-line no-alert
  window.alert(
    'This application has been updated. ' +
      'The page will automatically refresh to pull in the latest data.'
  );

  window.location.reload();
};
