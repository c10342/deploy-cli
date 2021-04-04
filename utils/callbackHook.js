function hook(config) {
  return function callbackHook(fnName,...args) {
    const fn = config[fnName];
    if (typeof fn === "function") {
      fn(...args);
    }
  };
}

module.exports = hook
