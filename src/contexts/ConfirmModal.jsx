// src/contexts/ConfirmModalContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const ConfirmModalContext = createContext();

export function ConfirmModalProvider({ children }) {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    resolve: null,
    reject: null,
  });

  // A função confirm retorna uma promise que será resolvida ou rejeitada conforme a ação do usuário.
  const confirm = useCallback(({ title, message, confirmText, cancelText }) => {
    return new Promise((resolve, reject) => {
      setConfirmState({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        resolve,
        reject,
      });
    });
  }, []);

  const handleConfirm = () => {
    if (confirmState.resolve) {
      confirmState.resolve();
    }
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    if (confirmState.reject) {
      confirmState.reject("cancel");
    }
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmModalContext.Provider value={{ confirm }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {confirmState.isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded shadow-lg text-white w-96"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl font-semibold text-center mb-4">
                  {confirmState.title || "Confirmação"}
                </h2>
                <p className="text-gray-300 text-center">
                  {confirmState.message}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-green-500 px-4 py-2 rounded cursor-pointer"
                    onClick={handleConfirm}
                  >
                    {confirmState.confirmText || "Confirmar"}
                  </button>
                  <button
                    className="bg-gray-500 px-4 py-2 rounded cursor-pointer"
                    onClick={handleCancel}
                  >
                    {confirmState.cancelText || "Cancelar"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </ConfirmModalContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmModalContext);
}
