"use client";

import {
  Heart,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Truck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function HeroSections() {
  const slides = [
    {
      id: 1,
      icon: (
        <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Fresh Organic Groceries 🫛",
      subtitle:
        "Farm‑fresh fruits, vegetables and daily essentials delivered to you",
      btnText: "Shop Now",
      mode: "light",
      bg: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=1332&auto=format&fit=crop",
    },
    {
      id: 2,
      icon: (
        <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />
      ),
      title: "Fast and Reliable Delivery 🚜",
      subtitle: "Speedy doorstep delivery with real‑time tracking",
      btnText: "Track Order",
      mode: "light",
      bg: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1115&auto=format&fit=crop",
    },
    {
      id: 3,
      icon: (
        <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-purple-400 drop-shadow-lg" />
      ),
      title: "Shop Anytime, Anywhere",
      subtitle: "Seamless shopping experience across all your devices",
      btnText: "Download App",
      mode: "light",
      bg: "https://images.unsplash.com/photo-1671445791136-049a3f151e3c?q=80&w=1332&auto=format&fit=crop",
    },
    {
      id: 4,
      icon: (
        <ShoppingCart className="w-20 h-20 sm:w-28 sm:h-28 text-orange-400 drop-shadow-lg" />
      ),
      title: "Exclusive Deals & Discounts 💸",
      subtitle: "Save more with daily offers and seasonal sales",
      btnText: "View Offers",
      mode: "dark",
      bg: "https://plus.unsplash.com/premium_photo-1686156705848-8692700509d2?q=80&w=1171&auto=format&fit=crop",
    },
    {
      id: 5,
      icon: (
        <ShieldCheck className="w-20 h-20 sm:w-28 sm:h-28 text-teal-400 drop-shadow-lg" />
      ),
      title: "Quality You Can Trust ✅",
      subtitle: "Every product is carefully inspected for freshness",
      btnText: "Learn More",
      mode: "dark",
      bg: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      icon: (
        <Heart className="w-20 h-20 sm:w-28 sm:h-28 text-red-400 drop-shadow-lg" />
      ),
      title: "Loved by Thousands ❤️",
      subtitle: "Join a community of happy and satisfied customers",
      btnText: "Read Reviews",
      mode: "light",
      bg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const [current, setCurrent] = useState(0);

  // ✅ FIXED: interval no longer resets every slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[96%] mx-auto mt-30 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
      {/* Background Image Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].bg}
            fill
            alt="slide"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Text + Icon */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-6 max-w-3xl"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg">
              {slides[current].icon}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl">
              {slides[current].title}
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-2xl">
              {slides[current].subtitle}
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg"
            >
              {slides[current].btnText}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSections;
