"use client";
import { motion } from "framer-motion";
export default function Footer() {
  return (
    <motion.footer
      className="my-5 font-inter px-4 text-center text-gray-600 "
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", delay: 2 }}
    >
      <small className="mb-2 text-base">
        Copyright <span className="text-primary-blue">&copy;</span> 2024 |
        Vignesh Kathiresan
      </small>
    </motion.footer>
  );
}
