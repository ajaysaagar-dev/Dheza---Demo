import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images-eu.ssl-images-amazon.com/images/G/31/img24/SmallAppliance/BAU/Aug/Kitchen_Home_Appliances_PC_Hero_3000x1200._CB566735518_.jpg")' }}
      />
      
      {/* Overlay Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-transparent" />
      
      {/* Hero Content - Amazon Style */}
      <div className="relative z-10 h-full max-w-[1500px] mx-auto px-4 pt-48">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
        >
          {/* Optional: Add Amazon-style floating cards here if needed */}
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
