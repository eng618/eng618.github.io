import './src/styles/index.scss';

export const onServiceWorkerUpdateReady = () => {
  window.alert(
    'This application has been updated. ' +
      'The page will automatically refresh to pull in the latest data in 10 seconds.',
  );

  for (let i = 10; i > 0; i--) {
    if (i === 0) {
      window.location.reload();
    }

    setTimeout(() => {}, 1000);
  }

  window.location.reload();
};
