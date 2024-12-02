export const S = (storage, key, value) =>
  storage.setItem(key, JSON.stringify(value));
const G = (storage, key) => {
  const value = storage.getItem(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
export const SS = (k, v) => S(window.sessionStorage, k, v);
export const SG = (k) => G(window.sessionStorage, k);
export const SC = () => window.sessionStorage.clear();
export const LS = (k, v) => {
  if (window.localStorage.getItem(k) === null) S(window.localStorage, k, v);
};
export const LG = (k) => G(window.localStorage, k);
export const stringify = (obj) => {
  try {
    return JSON.stringify(JSON.parse(obj));
  } catch (e) {
    return obj;
  }
};

export const download = (content) => {
  const blob = new Blob([content], { type: "application/octet-stream" });
  return URL.createObjectURL(blob);
};
