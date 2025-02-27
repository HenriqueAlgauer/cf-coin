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

  let classe;
  if (
    confirmState.confirmText === "Excluir" ||
    confirmState.confirmText === "Rejeitar"
  ) {
    classe =
      "hover:bg-red-500 transition-all ease-in font-mono border-1 border-red-500 shadow-xl px-4 py-2 rounded cursor-pointer";
  } else {
    classe =
      "hover:bg-green-400 transition-all ease-in font-mono border-1 border-green-400 shadow-xl px-4 py-2 rounded cursor-pointer";
  }

  return (
    <ConfirmModalContext.Provider value={{ confirm }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {confirmState.isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-10 bg-black/50"
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
                  <button className={classe} onClick={handleConfirm}>
                    {confirmState.confirmText || "Confirmar"}
                  </button>
                  <button
                    className="hover:bg-gray-500 border-1 border-gray-500 transition-all ease-in font-mono shadow-2xl px-4 py-2 rounded cursor-pointer"
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
