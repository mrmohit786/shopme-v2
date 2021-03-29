/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/offline.js').then(
        (registration) => {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        },
        (err) => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        },
      );
    });
  }
};
