import './src/styles/index.scss';

// eslint-disable-next-line import/prefer-default-export
export const onServiceWorkerUpdateReady = () => {
  // eslint-disable-next-line no-alert
  window.alert(
    'This application has been updated. ' +
      'The page will automatically refresh to pull in the latest data in 10 seconds.'
  );

  // eslint-disable-next-line no-plusplus
  for (let i = 10; i > 0; i--) {
    if (i === 0) {
      window.location.reload();
    }

    setTimeout(() => {}, 1000);
  }

  window.location.reload();
};
