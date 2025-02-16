import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./ToastContext"; // ajuste o caminho conforme sua estrutura

const FormModalContext = createContext();

export function FormModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    fields: [], // Ex.: [{ name: 'name', label: 'Nome', type: 'text', required: true }, ...]
    initialValues: {}, // Objeto com valores iniciais
    onSubmit: null, // Função de callback (interna)
    resolve: null,
    reject: null,
  });

  const showToast = useToast();

  // Função que abre o modal, retornando uma Promise que é resolvida ao submeter e rejeitada ao cancelar
  const openFormModal = useCallback(({ title, fields, initialValues }) => {
    return new Promise((resolve, reject) => {
      setModalState({
        isOpen: true,
        title,
        fields: fields || [],
        initialValues: initialValues || {},
        onSubmit: null, // Vamos tratar internamente
        resolve,
        reject,
      });
    });
  }, []);

  // Fecha o modal e rejeita a promise
  const handleCancel = () => {
    if (modalState.reject) {
      modalState.reject("cancel"); // ou outro valor indicando cancelamento
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Ao confirmar, validamos os campos e, se OK, resolvemos a promise
  const handleConfirm = (formValues) => {
    // Verifica se todos os campos required foram preenchidos
    for (const field of modalState.fields) {
      if (field.required && !formValues[field.name]) {
        showToast(`Campo "${field.label}" é obrigatório!`, "error");
        return; // Interrompe a submissão
      }
      if (field.type === "number") {
        formValues[field.name] = Number(formValues[field.name]);
        // Opcional: checar se éNaN
        if (isNaN(formValues[field.name])) {
          showToast(
            `Campo "${field.label}" deve ser um número válido!`,
            "error"
          );
          return;
        }
      }
    }
    // Se passou das validações, resolvemos a promise
    if (modalState.resolve) {
      modalState.resolve(formValues);
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <FormModalContext.Provider value={{ openFormModal }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {modalState.isOpen && (
            <FormModal
              modalState={modalState}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </FormModalContext.Provider>
  );
}

function FormModal({ modalState, onCancel, onConfirm }) {
  const [formValues, setFormValues] = useState(() => modalState.initialValues);

  // Atualiza formValues ao abrir o modal
  // para refletir "initialValues" caso sejam alterados externamente
  // (opcional, se preferir, pode fazer sem esse effect)
  // useEffect(() => setFormValues(modalState.initialValues), [modalState.initialValues]);

  const handleChange = (fieldName, value) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="bg-gray-800 p-6 rounded shadow-lg text-white w-96"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold mb-4">{modalState.title}</h2>
        {/* Formulário Dinâmico */}
        {modalState.fields.map((field) => (
          <div key={field.name} className="mb-3">
            <label className="block mb-1 text-sm" htmlFor={field.name}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                value={formValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="p-2 w-full bg-gray-700 rounded"
              />
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                value={formValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="p-2 w-full bg-gray-700 rounded"
              />
            )}
          </div>
        ))}

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => onCancel()}
            className="bg-gray-500 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(formValues)}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function useFormModal() {
  return useContext(FormModalContext);
}
