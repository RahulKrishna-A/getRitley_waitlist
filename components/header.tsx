import { motion } from "framer-motion";


import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Header() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed flex right-0 left-0 justify-between top-0 z-[50] m-4">
      <motion.div variants={itemVariants}>
       
      </motion.div>
      <motion.div variants={itemVariants}>
       
      </motion.div>
    </motion.div>
  );
}
