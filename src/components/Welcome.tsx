"use client"
import { motion } from 'motion/react'
import { ArrowRight, Bike, ShoppingBasket } from 'lucide-react'
type propType={
  nextStep:(s:number)=>void
}
function Welcome({nextStep}:propType) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-green-50 to-white">
      
      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="flex items-center justify-center gap-4"
      >
        <ShoppingBasket size={60} className="text-green-700 drop-shadow-md" />
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 tracking-tight">
          FreshCart
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl font-medium text-green-600 mt-4 max-w-xl leading-relaxed"
      >
        Your one-stop destination for <span className="font-semibold">fresh groceries</span>, 
        organic products, and daily essentials — delivered right to your doorstep.
      </motion.p>

      {/* Icons Section */}
      <div className="flex gap-10 mt-8 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <ShoppingBasket size={100} className="text-green-700 drop-shadow-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Bike size={100} className="text-amber-600 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-8 inline-flex items-center gap-1 px-5 py-3 text-xl md:text-2xl font-bold bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer shadow-lg hover:shadow-xl transition-all"
        onClick={()=>nextStep(2)}
      >
        Next 
        <ArrowRight size={28} className="text-white" />
      </motion.button>
    </div>
  )
}

export default Welcome
