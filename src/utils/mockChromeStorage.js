class MockChromeStorage {
  constructor() {
    this.storage = {};
  }

  get(keys, callback) {
    const result = {};
    keys.forEach((key) => {
      result[key] = this.storage[key] || null;
    });
    callback(result);
  }

  set(items) {
    Object.keys(items).forEach((key) => {
      this.storage[key] = items[key];
    });
  }
}

export const mockChrome = {
  storage: {
    sync: new MockChromeStorage()
  }
};
