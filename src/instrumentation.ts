
export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const noop = () => null;
    const fakeStorage = {
        getItem: noop,
        setItem: noop,
        removeItem: noop,
        clear: noop,
        key: noop,
        length: 0
    };
    if (!global.localStorage || typeof (global as any).localStorage.getItem !== 'function') {
        (global as any).localStorage = fakeStorage;
    }
  }
}
