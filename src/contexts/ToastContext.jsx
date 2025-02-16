// src/contexts/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  // Função para exibir o toast
  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      setToast({ message, type });
      setTimeout(() => {
        setToast(null);
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast &&
        createPortal(
          <div
            className={`z-20 fixed top-4 transition-all transition-discrete left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white  
              ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {toast.message}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
