import { Navbar } from "./components"
import { motion } from "framer-motion"

function App() {
  return (
    <>
      <Navbar/>
      <div>
        <motion.h1 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 1.5}}
          className='font-bold text-7xl text-center text-violet-600 mt-[40px]'>
            React - Vite - Tailwindcss
          </motion.h1>
      </div>
    </>
  )
}

export default App
