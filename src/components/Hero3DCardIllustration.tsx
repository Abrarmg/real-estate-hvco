import React from 'react';
import { motion } from 'motion/react';

export const Hero3DCardIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[390px] lg:max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none py-2">
      
      {/* Background Concentric Radial Circles with subtle pulse */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="280" cy="180" r="140" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="280" cy="180" r="180" stroke="#E2E8F0" strokeWidth="1.5" />
        <circle cx="280" cy="180" r="220" stroke="#F1F5F9" strokeWidth="1.5" />
      </motion.svg>

      {/* Main 3D Card Container with subtle floating & tilt animation */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        animate={{ 
          opacity: 1, 
          y: [0, -6, 0],
          rotate: [-2.5, -1.8, -2.5]
        }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ 
          rotate: 0,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="relative w-[270px] xs:w-[290px] sm:w-[310px] lg:w-[330px] h-[310px] xs:h-[330px] sm:h-[350px] lg:h-[370px] cursor-pointer"
      >
        
        {/* Deep ambient card shadow */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.22, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-4 -bottom-6 h-12 bg-slate-950 blur-2xl rounded-full pointer-events-none"
        />
        
        {/* 3D Main Slate / White Card */}
        <div className="relative w-full h-full bg-gradient-to-b from-[#FFFFFF] via-[#FBFDFF] to-[#F1F5F9] rounded-[26px] xs:rounded-[28px] p-4.5 xs:p-5 sm:p-6 shadow-[0_20px_50px_-10px_rgba(20,30,60,0.18),0_0_0_1px_rgba(255,255,255,1),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-4px_6px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle glossy sheen sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none opacity-60" />

          {/* Header Row: Blue House Badge + Skeleton Lines */}
          <div className="flex items-center justify-between relative z-10">
            {/* 3D Blue Circular House Badge */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 6 }}
              className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#3B82F6] p-0.5 shadow-[0_8px_16px_-2px_rgba(37,99,235,0.45),inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center transform -translate-x-1 -translate-y-1"
            >
              <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </motion.div>

            {/* Skeleton bars with shimmer */}
            <div className="flex flex-col gap-2 w-24 xs:w-28 sm:w-32">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-2 xs:h-2.5 bg-slate-200/80 rounded-full shadow-inner"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="h-1.5 xs:h-2 bg-slate-200/60 rounded-full shadow-inner"
              />
            </div>
          </div>

          {/* Graph Inner Area: Line Graph + 3D Bar Columns */}
          <div className="relative w-full h-[160px] xs:h-[180px] sm:h-[200px] mt-2 bg-gradient-to-b from-white/80 to-slate-50/60 rounded-2xl border border-slate-100/90 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-x-3 top-6 border-b border-dashed border-slate-200/60" />
            <div className="absolute inset-x-3 top-16 border-b border-dashed border-slate-200/60" />
            <div className="absolute inset-x-3 top-28 border-b border-dashed border-slate-200/60" />

            {/* Blue Line Graph Overlay with animated path drawing */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 260 160" preserveAspectRatio="none">
              {/* Path shadow */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.25 }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
                d="M 20 100 L 70 70 L 125 95 L 180 45 L 235 60"
                fill="none"
                stroke="rgba(37, 99, 235, 0.4)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform translate-y-1"
              />
              {/* Main blue stroke */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
                d="M 20 100 L 70 70 L 125 95 L 180 45 L 235 60"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Connection Node Dots with pop-in */}
              {[
                { cx: 20, cy: 100, delay: 0.4 },
                { cx: 70, cy: 70, delay: 0.65 },
                { cx: 125, cy: 95, delay: 0.9 },
                { cx: 180, cy: 45, delay: 1.15 },
                { cx: 235, cy: 60, delay: 1.4 }
              ].map((dot, idx) => (
                <motion.circle
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: dot.delay, type: "spring", stiffness: 300 }}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="4.5"
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* 3D Bar Columns Sitting on the Base with height rising animation */}
            <div className="w-full h-full flex items-end justify-between px-2 pt-10 z-0">
              
              {/* Pillar 1 */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: 'bottom' }}
                className="w-8 xs:w-9 sm:w-10 h-[38%] bg-gradient-to-t from-[#D8E0E8] via-[#EAEFF4] to-[#F8FAFC] rounded-t-lg shadow-[0_4px_6px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] border-t border-x border-white/80"
              />

              {/* Pillar 2 */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: 'bottom' }}
                className="w-8 xs:w-9 sm:w-10 h-[52%] bg-gradient-to-t from-[#D8E0E8] via-[#EAEFF4] to-[#F8FAFC] rounded-t-lg shadow-[0_4px_6px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] border-t border-x border-white/80"
              />

              {/* Pillar 3 */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: 'bottom' }}
                className="w-8 xs:w-9 sm:w-10 h-[44%] bg-gradient-to-t from-[#D8E0E8] via-[#EAEFF4] to-[#F8FAFC] rounded-t-lg shadow-[0_4px_6px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] border-t border-x border-white/80"
              />

              {/* Pillar 4: The Standout Yellow Pillar with shimmer */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, delay: 0.65, type: "spring", damping: 12 }}
                style={{ transformOrigin: 'bottom' }}
                className="w-8 xs:w-9 sm:w-10 h-[82%] bg-gradient-to-t from-[#EAB308] via-[#FACC15] to-[#FEF08A] rounded-t-lg shadow-[0_8px_16px_rgba(234,179,8,0.4),inset_0_1px_2px_rgba(255,255,255,0.9)] border-t border-x border-yellow-200"
              />
            </div>

          </div>

        </div>

        {/* Floating Left: Yellow 3D Speech Bubble with 3 Dots & Ambient Float */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [-6, -3, -6]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.12, rotate: 0 }}
          className="absolute -left-4 xs:-left-6 bottom-12 xs:bottom-14 w-12 h-10 xs:w-14 xs:h-11 sm:w-16 sm:h-12 bg-gradient-to-br from-[#FFDE33] via-[#FFCC00] to-[#E5B500] rounded-2xl rounded-bl-sm p-2 shadow-[0_12px_24px_rgba(229,181,0,0.45),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_2px_rgba(0,0,0,0.15)] flex items-center justify-center gap-1.5 cursor-pointer z-20"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs animate-pulse" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs animate-pulse [animation-delay:200ms]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs animate-pulse [animation-delay:400ms]" />
        </motion.div>

        {/* Floating Right: Yellow 3D User Avatar Badge & Ambient Float */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [6, 9, 6]
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.15, rotate: 0 }}
          className="absolute -right-3 xs:-right-5 top-16 xs:top-20 w-10 h-10 xs:w-12 xs:h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#FFDE33] via-[#FFCC00] to-[#E5B500] p-2 shadow-[0_12px_24px_rgba(229,181,0,0.45),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_2px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer z-20"
        >
          <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.633 13.067 13.067 0 01-6.761 1.87c-2.478 0-4.796-.682-6.76-1.87a.75.75 0 01-.364-.633l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.104.75.75 0 00.424-.67v-.002a5.625 5.625 0 00-5.25-5.594z" />
          </svg>
        </motion.div>

      </motion.div>

    </div>
  );
};
