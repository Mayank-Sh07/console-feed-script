import Hook from './Hook';

(function () {
  Hook(window.console, () => {}, true);
})();
