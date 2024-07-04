"use client";

export const getFromLocalstorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value as string);
};
