import Hook from './Hook';

(function () {
  // Hook into the iframe Console
  Hook(window.console, true);

  // Clear console on IIFE invocation
  parent.postMessage(
    {
      from: 'codedamn-iframe',
      type: 'clear',
    },
    '*'
  );
})();
