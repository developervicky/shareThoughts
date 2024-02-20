"use client";
import "@/components/Feed";
import Feed from "@/components/Feed";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <motion.h1
        className="head_text text-center"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 1 }}
      >
        Discover & Share
        <br />
        <span className="blue_gradient text-center">Random Thoughts</span>
      </motion.h1>
      <motion.p
        className="desc text-center"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.3, duration: 2 }}
      >
        Discover, and distribute imaginative thoughts with shareThought, an
        open-source sharing mindsets of people without getting any judgemental
        notes and play a major role in unfolding the new modern world
        convictions.
        <br />
        <span className="decoration-primary-blue underline">
          Think good and wise!
        </span>
      </motion.p>
      <Feed />
    </section>
  );
};

export default Home;
