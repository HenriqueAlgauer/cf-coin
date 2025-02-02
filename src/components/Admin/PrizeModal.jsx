import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PrizeModal({ isOpen, onClose, onSave, prize, isCreating }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: 0,
  });

  useEffect(() => {
    if (isOpen) {
      if (isCreating) {
        setFormData({ name: "", description: "", cost: 0 });
      } else if (prize) {
        setFormData({
          id: prize.id,
          name: prize.name,
          description: prize.description,
          cost: prize.cost,
        });
      }
    }
  }, [isOpen, isCreating, prize]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded shadow-lg text-white w-96"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {isCreating ? "Novo Prêmio" : "Editar Prêmio"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave(formData);
                onClose();
              }}
            >
              <label className="block text-sm mb-1">Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-2 w-full bg-gray-700 rounded mb-2"
                required
              />

              <label className="block text-sm mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="p-2 w-full bg-gray-700 rounded mb-2"
              />

              <label className="block text-sm mb-1">Custo (CF Coins)</label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: Number(e.target.value) })
                }
                className="p-2 w-full bg-gray-700 rounded mb-2"
                required
              />

              <button
                type="submit"
                className="bg-green-500 px-4 py-2 rounded w-full"
              >
                {isCreating ? "Criar" : "Salvar"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PrizeModal;
