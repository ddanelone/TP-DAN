"use client";

export const setInLocalstorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
