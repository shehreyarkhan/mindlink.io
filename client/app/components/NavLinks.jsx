'use client'
import { categories } from '../../constants'
import  { usePathname }  from 'next/navigation'

import NavLink from './NavLink'

const NavLinks = () => {
  const pathname = usePathname()

  const isActive =  (path) => {
    return pathname?.split("/").pop() === path;
  }

  return (
    <nav  className="nav grid grid-cols-4 md:grid-cols-9 text-xs md:text-md gap-4 pb-10 max-w-8xl mx-auto border-1">
      {  categories.map((navlink) => (
          <NavLink key={navlink} category={navlink} isActive={isActive(navlink)} />
        ))}
      
    </nav>
  )
}

export default NavLinks