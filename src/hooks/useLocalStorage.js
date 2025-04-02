// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Función para obtener el valor inicial desde localStorage
  const getStorageValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // Estado para almacenar el valor actual
  const [storedValue, setStoredValue] = useState(getStorageValue);

  // Función para actualizar tanto el estado como localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función como en el useState normal
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar al estado
      setStoredValue(valueToStore);
      
      // Guardar a localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
