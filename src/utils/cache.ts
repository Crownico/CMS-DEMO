// 封装成一个类，因为类里面可以提供多个方法，相对函数具有更强的封装能力，
class LocalCache {
  setCache(key: string, value: any) {
    // 缓存内容类型不确定，定义为 any
    // localStorage 中只能存字符串，所以需要转正 string
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key);
    if (value) {
      // 将 string 还原
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
}

const localCache = new LocalCache();
export default localCache;
