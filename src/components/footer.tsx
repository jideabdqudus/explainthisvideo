import type React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-4 text-center text-sm"
    >
      <p>
        Built by{" "}
        <a
          href="https://www.abdulqudus.com/"
          className="underline mr-2"
          target="_blank"
        >
          Jide.
        </a>
        Powered by{" "}
        <a href="https://together.ai" className="underline" target="_blank">
          Together.ai
        </a>{" "}
        &{" "}
        <a
          href="https://www.llama.com/"
          className="underline mr-2"
          target="_blank"
        >
          Llama 4.
        </a>
        <Github className="inline-block size-4" /> View on{" "}
        <a
          href="https://github.com/jideabdqudus/summarise-video"
          target="_blank"
          className="underline"
        >
          Github
        </a>
      </p>
    </motion.footer>
  );
};
