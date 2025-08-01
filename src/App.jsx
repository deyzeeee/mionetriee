import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MemoryWall() {
  const [formVisible, setFormVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [audio] = useState(new Audio("/assets/song.mp3"));
  const audioRef = useRef(audio);

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const playAudio = () => {
      audioRef.current.play().catch((e) =>
        console.log("Autoplay blocked, waiting user interaction.")
      );
      document.removeEventListener("click", playAudio);
    };

    document.addEventListener("click", playAudio);

    return () => {
      audioRef.current.pause();
      document.removeEventListener("click", playAudio);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!quote.trim()) return;
    setMessages((prev) => [...prev, { name, quote, image: preview }]);
    setName("");
    setQuote("");
    setImage(null);
    setPreview(null);
    setFormVisible(false);
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 bg-blue-200 text-black overflow-hidden">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center drop-shadow-xl">
        Memory Wall
      </h1>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/10 text-black shadow-md max-w-xs">
              <CardContent className="p-4">
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Foto"
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                )}
                <p className="text-lg font-semibold">{msg.name}</p>
                <p className="text-sm italic">"{msg.quote}"</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {formVisible && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-8 w-full max-w-md mx-auto px-4 flex flex-col gap-2"
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama (opsional)"
              className="bg-white text-black placeholder-gray-600"
            />
            <Input
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Quotes atau pesan..."
              className="bg-white text-black placeholder-gray-600"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-black"
            />
            <Button type="submit" variant="secondary">
              Kirim
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {!formVisible && (
        <Button
          onClick={() => setFormVisible(true)}
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 flex items-center justify-center bg-white text-black shadow-lg"
        >
          <Plus />
        </Button>
      )}
    </div>
  );
}
