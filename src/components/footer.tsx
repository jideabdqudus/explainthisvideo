import type React from "react";
import { motion } from "framer-motion";

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
          href="https://www.linkedin.com/in/jideabdqudus/"
          className="underline"
          target="_blank"
        >
          Jide
        </a>
        . Powered by{" "}
        <a href="https://together.ai" className="underline" target="_blank">
          Together.ai
        </a>{" "}
        &{" "}
        <a href="https://www.llama.com/" className="underline" target="_blank">
          Llama 4
        </a>
        .
      </p>
    </motion.footer>
  );
};
