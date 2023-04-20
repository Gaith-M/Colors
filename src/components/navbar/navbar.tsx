import { Link } from "react-router-dom"
import Logo from "../logo/logo"

const Navbar = () => {
  return (
    <div className="h-[50px] absolute top-0 left-0 right-0
    flex justify-between items-center
    px-2 sm:px-4 md:px-6 lg:px-12
    bg-gray-50 drop-shadow-[0px_1px_12px_rgba(215,215,215,1)] bg-opacity-75">

        <Logo/>

        <nav className="flex gap-3 text-sm text-gray-700 capitalize">
            <Link to="/about">About</Link>
        </nav>
    </div>
  )
}

export default Navbar