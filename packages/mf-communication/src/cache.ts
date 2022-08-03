const namespace = 'Module_Federation_Customer';

export const setCache = (key: string, value: any): void => {
  if (!(window as any)[namespace]) {
    (window as any)[namespace] = {};
  }
  (window as any)[namespace][key] = value;
};

export const getCache = (key: string): any => {
  const globalCache: any = (window as any)[namespace];
  return globalCache && globalCache[key] ? globalCache[key] : null;
};
