"use client";

export const getFromLocalstorage = (key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value as string);
  }
  return null; // Devuelve null si no estás en el entorno del navegador
};
