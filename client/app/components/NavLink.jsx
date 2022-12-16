import Link from "next/link"


const NavLink = ({category, isActive}) => {
  return (
    <Link href={`/news/${category}`} className={`navLink ${isActive && 'underline decoration-orange-400 underline-offset-4 font-bold'}`}>{category}</Link>
  )
}

export default NavLink