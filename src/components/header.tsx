import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4 pt-8 cursor-pointer px-12">
        <div className="text-sm font-bold mb-2">summarise.video</div>
      </div>
    </motion.header>
  );
}
