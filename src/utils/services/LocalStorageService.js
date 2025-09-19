
class LocalStorageService {
  static getUser() {
    const persistUser = localStorage.getItem('persist:user') || ""
    return persistUser == "" ? "" : JSON.parse(persistUser);
  }

  static setItem(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem(key) {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default LocalStorageService;