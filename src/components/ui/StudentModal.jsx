import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function StudentModal({ isOpen, onClose, onSave, student }) {
  const [quote, setQuote] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSave = () => {
    onSave({ quote, photo });
    setQuote("");
    setPhoto(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="bg-white p-6 rounded-lg z-10 w-80">
        <Dialog.Title className="text-lg font-bold mb-4">Upload Foto & Quote - {student}</Dialog.Title>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="mb-3"
        />
        <textarea
          placeholder="Masukkan quote kamu..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Batal</button>
          <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">Simpan</button>
        </div>
      </div>
    </Dialog>
  );
}
