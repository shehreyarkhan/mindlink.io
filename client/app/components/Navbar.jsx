"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import style from '../../styles'
import {
  fadeIn,
  navVariants,
  footerVariants,
  planetVariants,
  slideIn,
  zoomIn,
} from "../../lib/motion";
import { useSelector, useDispatch } from "react-redux";
import { sidebarToggle, setActiveTab, searchbarToggle, setSearchTerm } from "../../slices/appSlice";
import ToggleTheme from "../../components/toggleTheme";
import Link from "next/link";

const Navbar = () => {
  const navLinks = ["Home", "Explore", "Marketplace", "Profile"];
  const sidebar = useSelector((state) => state.app.sidebar);
  const searchTerm = useSelector((state) => state.app.searchTerm.value);
  const activeTab = useSelector((state) => state.app.activeTab);
  const themeMode = useSelector((state) => state.app.mode);
  const searchBar = useSelector((state) => state.app.searchbar);
  const username = useSelector((state) => state.data.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // console.log(navLinks[0])
    };
  }, [sidebar, activeTab, searchBar]);

  const styles = {
    activeTabStyle: `text-2xl leading-[30.24px] font-bold border-b-2 border-b-purple-500 `,
    tabStyle: `text-xl `,
  };

  const setActive = (name) => {
    dispatch(setActiveTab(name));
  };

  function setSearch(){
    console.log("IN SEARCH SET CONSOLE")
    dispatch(searchbarToggle(!searchBar))
  }


  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`px-8 py-8 relative h-[6rem]  sticky top-0 z-[90] drop-shadow bg-secondary-white dark:bg-primary-black`}
      >
        
        <div className="absolute w-[50%] inset-0 gradient-01" />
        <di
          className={`${styles.innerWidth} mx-auto cursor-pointer align-center item-center flex justify-between gap-8`}
        >
          

          <motion.h2 
              variants={fadeIn("right", "spring", 0.2, 10)}
          
          className="font-extrabold text-[24px] leading-[30.24px] dark:text-white light:text-black">
            <Link href={'/'}>
            DESCREATE 
            </Link>
          </motion.h2>
          <motion.div 
              variants={fadeIn("left", "spring", 0, 10)}
          className={`flex  ${!username&&'hidden'} relative gap-x-4`}>
          <button onClick={()=> dispatch(searchbarToggle())}>
          <motion.svg
            variants={footerVariants}
            initial="hidden"
            whileInView="show"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${searchBar ? 'hidden': 'block'} w-6 h-6 text-primary-black dark:text-secondary-white`}
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
          </motion.svg>
          <motion.svg 
          variants={footerVariants}
          initial="hidden"
          whileInView="show"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`${searchBar ? 'block': 'hidden'} w-6 h-6 text-primary-black dark:text-purple-400`}
          
          >
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</motion.svg>

          </button>
              <ToggleTheme />
            <button onClick={() => dispatch(sidebarToggle())}>
              {themeMode === "dark" && (
                <img
                  src="/menu.svg"
                  alt="menu"
                  className="w-[24px] h-[24px] bg-primary-black object-contain"
                />
                )}
              {themeMode === "light" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-[24px] h-[24px] ${!sidebar ? 'text-primary-black': 'text-purple-700'}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                  />
                </svg>
              )}
            </button>

         

          </motion.div>
        </di>
        {sidebar && (
          <div className="flex mt-[2rem] w-full justify-end">
            <motion.div
              variants={fadeIn("left", "spring", 0, 0)}
              initial="hidden"
              whileInView="show"
              className={`top-0 right-0 w-full xlg:w-1/3 py-4 rounded-lg text-lg justify-end opacity-20 dark:text-white light:text-black  text-end relative`}
            >
              <ul className="space-x-[2rem] text-center justify-evenly flex">
                {navLinks.map((i) => {
                  console.log(i);
                  return (
                    <>
                    <Link href={`#${i}`} legacyBehavior>
                      <motion.li
                        variants={footerVariants}
                        initial="hidden"
                        whileInView="show"
                        
                        className={`${
                          activeTab.value === i
                            ? styles.activeTabStyle
                            : styles.tabStyle
                        }`}
                      >
                        <button onClick={() => setActive(i)}>{i}</button>
                      </motion.li>
                      </Link>
                    </>
                  );
                })}

                {/* <li className={`${activeTab.value === 'Home' ? styles.activeTabStyle : styles.tabStyle}`}>
              <button onClick={()=>setActive('Home')}>
              Home
              </button>
            </li>
            <li className={styles.activeTabStyle}>
            <button onClick={()=>setActive('Explore')}>
              Explore
              </button>
            </li>
            <li className={styles.activeTabStyle}>
            <button onClick={()=>setActive('Marketplace')}>
              Marketplace
              </button>
            </li>
            <li className={styles.activeTabStyle}>
            <button onClick={()=>setActive('Profile')}>
              Profile
              </button>
            </li> */}
              </ul>
            </motion.div>
          </div>
        )}
        {searchBar && (
          <motion.div 
          variants={footerVariants}
          initial="hidden"
          whileInView="show"

          className="mt-4 flex relative items-center">
            <input
              type="text"
              className="px-4 rounded py-2 w-full dark:bg-slate-200 dark:text-black"
              placeholder="Search"
              onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
              }}
              name="search"
              id="search-term"
            />
            <motion.div 
               variants={fadeIn('right', 'spring', 0.2, 100)}
               initial="hidden"
               whileInView="show"

            className="absolute right-4" onClick={setSearch}>

             <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={` w-6 h-6  cursor-pointer text-primary-black  `}
            ><path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
        </svg>
            </motion.div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;
