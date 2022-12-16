'use client'
import { motion } from "framer-motion";
import { TypingText } from "../index";
import styles from "../../../styles";
import { fadeIn, staggerContainer } from "../../../lib/motion";



const About = () => (
  <section className={`${styles.paddings} relative z-10`}>

    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Descreate" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-primary-black  dark:text-secondary-white"
      >
        <span className="font-extrabold dark:text-white text-purple-600">DESCREATE</span> offers
        innovative solutions to help you unlock your  <span className="font-extrabold dark:text-white">creativity, save time and
        money</span>. We offer a variety of tools and services to help you make the
        most of your creativity and  <span className="font-extrabold dark:text-white">maximize efficiency</span>. Our resources are
        designed to help you stay ahead of the curve and stay productive. We
        strive to provide an easy-to-use, cost-effective solution to help you
        reach your goals.
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px]  object-contain mt-[28px]"
      />
    </motion.div>

  </section>
);

export default About;
