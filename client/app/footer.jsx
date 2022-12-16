'use client';

import { motion } from 'framer-motion';
import { socials } from '../constants/index';

import styles from '../styles';
import { footerVariants } from '../lib/motion';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-primary-black dark:text-secondary-white">
          Enter to Creators Panel
        </h4>
        <button type="button" className="flex items-center h-fit py-4 px-6 hero-gradient dark:bg-[#25618B] rounded-[32px] gap-[12px]">
          <img
            src="/headset.svg"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          />
          <span className="font-normal text-[16px] text-white ">
            Sign in
          </span>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-primary-black dark:bg-secondary-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-primary-black dark:text-secondary-white">
            DESCREATE
          </h4>
          <p className="font-normal text-[14px] text-primary-black dark:text-secondary-white opacity-50">
            Copyright © 2022 - 2023 Descreate Inc. All rights reserved.
        
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
