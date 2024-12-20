// SPDX-FileCopyrightText: 2024 The Forkbomb Company
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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
export const SS = (k, v) => {
  S(window.sessionStorage, k, v);
  document.dispatchEvent(new Event(k + "-updated"));
};
export const SG = (k) => G(window.sessionStorage, k);
export const SC = () => window.sessionStorage.clear();
export const LS = (k, v) => {
  if (window.localStorage.getItem(k) === null) {
    S(window.localStorage, k, v);
    document.dispatchEvent(new Event(k + "-updated"));
  }
};
export const LG = (k) => G(window.localStorage, k);
export const stringify = (obj) => {
  try {
    return JSON.stringify(JSON.parse(obj));
  } catch (e) {
    return obj;
  }
};

export const download = (content, decode = false) => {
  if (decode) {
    const byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(null)
      .map((_, i) => byteCharacters.charCodeAt(i));
    content = new Uint8Array(byteNumbers);
  }
  const blob = new Blob([content], { type: "application/octet-stream" });
  return URL.createObjectURL(blob);
};
