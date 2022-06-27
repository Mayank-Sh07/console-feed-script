import Hook from './Hook';

(function () {
  // Hook into the iframe Console
  Hook(window.console, true);

  // Log JS errors
  window.addEventListener('error', ({ error }) => {
    console.error(error);
  });

  // Clear console on IIFE invocation
  parent.postMessage(
    {
      from: 'codedamn-iframe',
      type: 'clear',
    },
    '*'
  );
})();
