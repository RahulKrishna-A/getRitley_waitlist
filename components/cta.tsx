import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-muted/80 text-center">
            <AnimatedShinyText className="px-4 py-1">
              <span>Coming soon!</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      <motion.img
        src="/getRitelyLogo.png"
        alt="logo"
        className="mx-auto h-20 w-20 my-4"
        variants={itemVariants}
      />

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
          text="Your AI Copilot for Social Media Growth"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[29rem] pt-1.5 text-center text-base text-zinc-300 sm:text-lg"
          text="Struggling with low engagements? We're building the fix."
          duration={0.8}
        />
        <TextBlur
          className="mx-auto max-w-[27rem] pt-1 text-center text-sm text-zinc-400 sm:text-base mt-2"
          text="Join the waitlist to get early access of the product!"
          duration={1.0}
        />
      </motion.div>
    </motion.div>
  );
}
