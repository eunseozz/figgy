import type { PersistStorage, StorageValue } from "zustand/middleware";

export const chromeStorage: PersistStorage<any> = {
  getItem: async <T>(name: string): Promise<StorageValue<T> | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        if (!result[name]) return resolve(null);

        try {
          resolve(JSON.parse(result[name]) as StorageValue<T>);
        } catch {
          resolve(null);
        }
      });
    });
  },

  setItem: async <T>(name: string, value: StorageValue<T>): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [name]: JSON.stringify(value) }, () =>
        resolve(),
      );
    });
  },

  removeItem: async (name: string): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.remove([name], () => resolve());
    });
  },
};
