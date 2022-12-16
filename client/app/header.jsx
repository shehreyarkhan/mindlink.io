import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import NavLinks from './components/NavLinks'

const Header = ({name}) => {
  return (
    <header>
        <div className="grid grid-cols-3 p-10 items-center">
            <Bars3Icon className="w-8 h-8 cursor-pointer"/>
            <Link href="/">
             <h1 className="font-serif text-3xl lg:text-4xl items-center text-center"> 
              Mind<span className="underline decoration-6 decoration-lime-600">Link</span>.io
               </h1>
            </Link>

            <div className="flex items-center justify-end space-x-2">
              <button className="hidden md:inline bg-purple-600 p-4 rounded-lg px-6 dark:bg-orange-600 ">
                Subscribe now
              </button>
            </div>
        </div>

                {<NavLinks/>}

    </header>
  )
}

export default Header