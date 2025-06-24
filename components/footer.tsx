import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 flex w-full items-center justify-center gap-1 border-t bg-background p-6 text-muted-foreground md:justify-start">
      <motion.div variants={itemVariants}>
        Brought to you by{" "}
        
          <span className="text-zinc-300 underline underline-offset-2 transition-all duration-200 ease-linear hover:text-pink-400">
            getRitely
          </span>
          .
        
      </motion.div>
    </motion.div>
  );
}
