/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Search, 
  Bell, 
  Menu, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  MoreHorizontal,
  AlertTriangle,
  ShieldAlert,
  Lock,
  X,
  MonitorOff
} from 'lucide-react';

type PrankStage = 
  | 'LANDING' 
  | 'DOWNLOADING' 
  | 'FLASHING' 
  | 'REPAIR_PROMPT' 
  | 'ANTIVIRUS_INSTALL' 
  | 'CENTRAL_CEE' 
  | 'NO_SIGNAL' 
  | 'PASSWORD' 
  | 'FBI_SCREEN' 
  | 'SHUTDOWN' 
  | 'BLACK_OUT'
  | 'WINDOWS_11'
  | 'GHOST_DOME_SCARY'
  | 'GHOST_DOME_THREAT'
  | 'GHOST_DOME_COMPROMISED'
  | 'GHOST_DOME_FLASHING'
  | 'BSOD'
  | 'SONIC_GAME'
  | 'WIN_SCREEN'
  | 'LOSE_SCREEN'
  | 'SCAMMED_SCREEN'
  | 'FINAL_BONZI'
  | 'LOSE_FLASHING_FAST'
  | 'MOCKING_MESSAGE'
  | 'LOSE_FLASHING_SLOW'
  | 'SONIC_LOSE_THX'
  | 'SONIC_LOSE_RED'
  | 'SONIC_LOSE_WHITE';

export default function App() {
  const [stage, setStage] = useState<PrankStage>('LANDING');
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [fbiTimer, setFbiTimer] = useState<NodeJS.Timeout | null>(null);
  const [noSignalCount, setNoSignalCount] = useState(0);
  
  // Sonic Game State
  const [sonicPos, setSonicPos] = useState(0);
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  
  // Windows 11 State
  const [showGhostDomeDownload, setShowGhostDomeDownload] = useState(false);

  useEffect(() => {
    if (hasStarted && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  }, [hasStarted]);

  // Stage Transitions
  useEffect(() => {
    if (stage === 'DOWNLOADING') {
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('FLASHING'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (stage === 'FLASHING') {
      const timer = setTimeout(() => setStage('REPAIR_PROMPT'), 5000);
      return () => clearTimeout(timer);
    }

    if (stage === 'CENTRAL_CEE') {
      const timer = setTimeout(() => {
        setNoSignalCount(1);
        setStage('NO_SIGNAL');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'NO_SIGNAL' && noSignalCount === 0) {
      const timer = setTimeout(() => setStage('PASSWORD'), 2000);
      return () => clearTimeout(timer);
    }

    if (stage === 'GHOST_DOME_SCARY') {
      const timer = setTimeout(() => setStage('GHOST_DOME_THREAT'), 4000);
      return () => clearTimeout(timer);
    }

    if (stage === 'GHOST_DOME_COMPROMISED') {
      const timer = setTimeout(() => setStage('GHOST_DOME_FLASHING'), 10000);
      return () => clearTimeout(timer);
    }

    if (stage === 'GHOST_DOME_FLASHING') {
      const timer = setTimeout(() => setStage('BSOD'), 7000);
      return () => clearTimeout(timer);
    }

    if (stage === 'BSOD') {
      const timer = setTimeout(() => setStage('SONIC_GAME'), 4000);
      return () => clearTimeout(timer);
    }

    if (stage === 'FBI_SCREEN') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('SHUTDOWN');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    if (stage === 'SHUTDOWN') {
      const timer = setTimeout(() => setStage('BLACK_OUT'), 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'SONIC_LOSE_THX') {
      const timer = setTimeout(() => setStage('SONIC_LOSE_RED'), 2000);
      return () => clearTimeout(timer);
    }

    if (stage === 'SONIC_LOSE_RED') {
      const timer = setTimeout(() => setStage('SONIC_LOSE_WHITE'), 2000);
      return () => clearTimeout(timer);
    }

    if (stage === 'SONIC_LOSE_WHITE') {
      const timer = setTimeout(() => setStage('LOSE_FLASHING_FAST'), 2000);
      return () => clearTimeout(timer);
    }

    if (stage === 'LOSE_FLASHING_FAST') {
      const timer = setTimeout(() => setStage('MOCKING_MESSAGE'), 2000);
      return () => clearTimeout(timer);
    }

    if (stage === 'MOCKING_MESSAGE') {
      const timer = setTimeout(() => setStage('LOSE_FLASHING_SLOW'), 30000); // 20s message + 10s button window
      return () => clearTimeout(timer);
    }

    if (stage === 'LOSE_FLASHING_SLOW') {
      const timer = setTimeout(() => setStage('BLACK_OUT'), 20000);
      return () => clearTimeout(timer);
    }
  }, [stage, noSignalCount]);

  // Sonic Game Loop
  useEffect(() => {
    if (stage === 'SONIC_GAME' && gameStatus === 'PLAYING') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') setSonicPos(prev => prev + 5);
      };
      window.addEventListener('keydown', handleKeyDown);
      
      const gameTimer = setTimeout(() => {
        if (sonicPos < 80) setGameStatus('LOST');
        else setGameStatus('WON');
      }, 5000);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(gameTimer);
      };
    }
  }, [stage, gameStatus, sonicPos]);

  useEffect(() => {
    if (gameStatus === 'WON') setStage('WIN_SCREEN');
    if (gameStatus === 'LOST') setStage('SONIC_LOSE_THX'); 
  }, [gameStatus]);

  useEffect(() => {
    if (stage === 'SHUTDOWN' && gameStatus === 'LOST') {
      const timer = setTimeout(() => setStage('LOSE_FLASHING_FAST'), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage, gameStatus]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      // In this prank, even the right password might lead to the FBI screen
      setStage('FBI_SCREEN');
    } else {
      setPasswordAttempts(prev => prev + 1);
      if (passwordAttempts >= 1) {
        setStage('FBI_SCREEN');
      } else {
        alert('Incorrect password. Put right password.');
      }
    }
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans overflow-x-hidden">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-[#0f0f0f] flex items-center justify-between px-4 h-14 z-50">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 cursor-pointer" />
          <div className="flex items-center gap-1 cursor-pointer">
            <Youtube className="w-8 h-8 text-red-600 fill-current" />
            <span className="font-bold text-xl tracking-tighter">YouTube</span>
          </div>
        </div>
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
          <div className="flex w-full">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#121212] border border-[#303030] rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 hover:bg-[#303030]">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 cursor-pointer" />
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-8 lg:px-24 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/youtube/1280/720" 
              alt="Video thumbnail" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold mt-4">HOW TO GET 100,000,000 SUBSCRIBERS IN 1 SECOND! (WORKING 2026)</h1>
          
          <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Matt's Tech Tips</p>
                <p className="text-xs text-gray-400">12.4M subscribers</p>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-full font-medium ml-4 hover:bg-gray-200">Subscribe</button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-[#272727] rounded-full overflow-hidden">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] border-r border-[#3f3f3f]">
                  <ThumbsUp className="w-5 h-5" /> 1.2M
                </button>
                <button className="px-4 py-2 hover:bg-[#3f3f3f]">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 bg-[#272727] px-4 py-2 rounded-full hover:bg-[#3f3f3f]">
                <Share2 className="w-5 h-5" /> Share
              </button>
              <button className="flex items-center gap-2 bg-[#272727] px-4 py-2 rounded-full hover:bg-[#3f3f3f]">
                <Download className="w-5 h-5" /> Download
              </button>
              <button className="bg-[#272727] p-2 rounded-full hover:bg-[#3f3f3f]">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6 border-t border-[#303030] pt-6">
            <h3 className="font-bold text-lg mb-4">42,891 Comments</h3>
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="flex-1 bg-transparent border-b border-[#303030] pb-1 focus:outline-none focus:border-white"
              />
            </div>

            {/* The Prank Link Comment */}
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Official Subscriber Bot</span>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <p className="mt-1">GUYS IT ACTUALLY WORKS! I JUST GOT 100M SUBS!! CLICK HERE FAST: </p>
                <button 
                  onClick={() => setStage('DOWNLOADING')}
                  className="text-blue-400 font-bold hover:underline mt-1 block"
                >
                  Free 100m subs
                </button>
                <div className="flex items-center gap-4 mt-2 text-gray-400">
                  <ThumbsUp className="w-4 h-4" /> 15k
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-xs font-bold">REPLY</span>
                </div>
              </div>
            </div>

            {/* Other Comments */}
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 mb-6 opacity-60">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">User_{i}92</span>
                    <span className="text-xs text-gray-400">{i} days ago</span>
                  </div>
                  <p className="mt-1">Wow this is crazy, I can't believe it works.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96">
          <h3 className="font-bold mb-4">Up next</h3>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex gap-2 mb-3">
              <div className="w-40 aspect-video bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={`https://picsum.photos/seed/vid${i}/200/112`} 
                  alt="Related video" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold line-clamp-2">How to get free V-Bucks in 2026 (NO SCAM)</h4>
                <p className="text-xs text-gray-400 mt-1">Matt's Tech Tips</p>
                <p className="text-xs text-gray-400">1.2M views • 1 year ago</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const renderDownloading = () => (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] text-white p-6">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-2xl border border-[#333] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Download className="w-10 h-10 text-blue-500 animate-bounce" />
          <div>
            <h2 className="text-xl font-bold">Downloading 100M Subs Package</h2>
            <p className="text-sm text-gray-400">Please do not close this window...</p>
          </div>
        </div>
        
        <div className="w-full bg-[#333] h-4 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${downloadProgress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm font-mono">
          <span>{downloadProgress}% Complete</span>
          <span>{Math.round((downloadProgress / 100) * 1.4)} GB / 1.4 GB</span>
        </div>
      </div>
    </div>
  );

  const renderFlashing = () => (
    <motion.div 
      className="fixed inset-0 z-[200]"
      animate={{ 
        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      }}
      transition={{ 
        duration: 0.1, 
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-10">
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          <AlertTriangle className="w-48 h-48 mb-8" />
        </motion.div>
        <h1 className="text-6xl font-black uppercase italic tracking-tighter drop-shadow-2xl">
          VIRUS DETECTED!
        </h1>
        <p className="text-2xl font-bold mt-4 bg-black/50 px-4 py-2">System compromised by MEMEZ.EXE</p>
      </div>
    </motion.div>
  );

  const renderRepairPrompt = () => (
    <div className="fixed inset-0 bg-[#800000] flex items-center justify-center z-[300] p-6">
      <div className="bg-white text-black p-8 rounded-lg shadow-2xl max-w-md w-full border-4 border-red-600">
        <div className="flex items-center gap-4 mb-6">
          <ShieldAlert className="w-12 h-12 text-red-600" />
          <h2 className="text-2xl font-black uppercase">Critical System Error</h2>
        </div>
        <p className="mb-8 text-lg font-medium">
          A dangerous virus has been detected on your computer. Your files are currently being encrypted.
        </p>
        <button 
          onClick={() => setStage('ANTIVIRUS_INSTALL')}
          className="w-full bg-red-600 text-white py-4 rounded-md font-bold text-xl hover:bg-red-700 transition-colors uppercase tracking-widest"
        >
          Delete Virus Now
        </button>
      </div>
    </div>
  );

  const renderAntivirusInstall = () => (
    <div className="fixed inset-0 bg-[#004a99] flex flex-col items-center justify-center z-[400] text-white p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1 w-12 h-12">
              <div className="bg-[#f25022]" />
              <div className="bg-[#7fbb00]" />
              <div className="bg-[#00a4ef]" />
              <div className="bg-[#ffb900]" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Microsoft Anti-Virus</h2>
        <p className="text-blue-200 mb-8">Scanning and removing threats...</p>
        
        <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setTimeout(() => setStage('CENTRAL_CEE'), 500);
            }}
          />
        </div>
        <p className="text-sm font-mono">Cleaning: System32/drivers/memez.sys</p>
      </div>
    </div>
  );

  const renderCentralCee = () => (
    <div className="fixed inset-0 bg-yellow-400 flex flex-col items-center justify-center z-[500] p-6 overflow-hidden">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="relative"
      >
        <img 
          src="https://picsum.photos/seed/centralcee/600/600" 
          alt="Central Cee" 
          className="w-80 h-80 object-cover rounded-full border-8 border-black shadow-2xl"
          referrerPolicy="no-referrer"
        />
        <motion.div 
          className="absolute -top-10 -right-10 bg-black text-white px-6 py-3 rounded-full font-black text-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          STAY SICK
        </motion.div>
      </motion.div>
      <h1 className="text-8xl font-black mt-12 text-black tracking-tighter italic">STAY SICK</h1>
    </div>
  );

  const renderNoSignal = () => (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center z-[600] cursor-pointer"
      onClick={() => {
        if (noSignalCount === 1) {
          setStage('WINDOWS_11');
        } else if (noSignalCount === 2) {
          setStage('FINAL_BONZI');
        }
      }}
    >
      <div className="text-center">
        <MonitorOff className="w-24 h-24 text-gray-600 mx-auto mb-4" />
        <h2 className="text-gray-400 font-mono text-xl">NO SIGNAL</h2>
        <p className="text-gray-600 font-mono text-sm mt-2">HDMI 1</p>
        <p className="text-gray-800 text-xs mt-10">[ CLICK BACK ]</p>
      </div>
    </div>
  );

  const renderWindows11 = () => (
    <div className="fixed inset-0 bg-[#0078d4] z-[1100] overflow-hidden font-sans">
      <img 
        src="https://picsum.photos/seed/win11/1920/1080" 
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        alt="Windows 11 Wallpaper"
        referrerPolicy="no-referrer"
      />
      
      {/* 1000 Tabs (Simulated with many windows) */}
      <div className="absolute inset-0 p-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/80 border border-gray-300 shadow-lg rounded-t-lg w-64 h-40"
            style={{ 
              top: `${Math.random() * 60}%`, 
              left: `${Math.random() * 70}%`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
          >
            <div className="bg-gray-200 h-6 flex items-center px-2 justify-between">
              <span className="text-[10px]">New Tab {i}</span>
              <X className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center gap-4 border-t border-white/20">
        <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center cursor-pointer">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-white" /><div className="bg-white" /><div className="bg-white" /><div className="bg-white" />
          </div>
        </div>
        <div 
          className="w-8 h-8 bg-white rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-200"
          onClick={() => setShowGhostDomeDownload(true)}
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Chrome" />
        </div>
      </div>

      {/* Ghost Dome Download Dialog */}
      {showGhostDomeDownload && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-auto">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96 border border-gray-300">
            <h3 className="text-lg font-bold mb-2">Official subscriber pack Download</h3>
            <p className="text-sm text-gray-600 mb-6">File: ghost_dome_v2.exe (842 MB)</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">Cancel</button>
              <button 
                onClick={() => setStage('GHOST_DOME_SCARY')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-bold"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderGhostDomeScary = () => (
    <div className="fixed inset-0 bg-black z-[1200] flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-red-900/40"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <div className="relative z-10 text-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.1, repeat: Infinity }}
        >
          <img 
            src="https://picsum.photos/seed/scaryface/800/800?grayscale" 
            className="w-96 h-96 object-cover rounded-full border-8 border-red-600 grayscale contrast-200"
            alt="Scary Face"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <h1 className="text-red-600 text-9xl font-black italic mt-10 drop-shadow-[0_0_20px_rgba(255,0,0,1)]">GHOST DOME</h1>
      </div>
      {/* Blood Drips */}
      <div className="absolute top-0 left-0 right-0 flex justify-around">
        {[1, 2, 3, 4, 5].map(i => (
          <motion.div 
            key={i}
            className="w-4 bg-red-700 rounded-b-full"
            initial={{ height: 0 }}
            animate={{ height: '100vh' }}
            transition={{ duration: 4, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );

  const renderGhostDomeThreat = () => (
    <div className="fixed inset-0 bg-black z-[1300]">
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-2xl border-l-8 border-red-600 w-80">
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert className="text-red-600 w-6 h-6" />
          <span className="font-bold">Microsoft Anti-Virus</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">A critical threat (Ghost Dome) was found on your system.</p>
        <button 
          onClick={() => setStage('GHOST_DOME_COMPROMISED')}
          className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700"
        >
          Clear Threat
        </button>
      </div>
    </div>
  );

  const renderGhostDomeCompromised = () => (
    <div className="fixed inset-0 bg-black z-[1400] flex flex-col items-center justify-center text-white p-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl font-black text-red-600 mb-6 uppercase">bad choice haha</h1>
        <p className="text-2xl font-bold mb-4">Now you computer is Comprimized by the ghost dome virus</p>
        <p className="text-xl text-gray-400 italic">You should of not download that</p>
      </motion.div>
    </div>
  );

  const renderGhostDomeFlashing = () => (
    <motion.div 
      className="fixed inset-0 z-[1500]"
      animate={{ 
        backgroundColor: ['#ff0000', '#000000', '#ffffff', '#ff0000'],
      }}
      transition={{ duration: 0.05, repeat: Infinity }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-[20vw] font-black text-white mix-blend-difference animate-pulse">SCREAMING</h1>
        <div className="absolute inset-0 flex flex-wrap opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <AlertTriangle key={i} className="w-20 h-20 text-white" />
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderBsod = () => (
    <div className="fixed inset-0 bg-[#0078d7] z-[1600] text-white p-20 font-sans cursor-none">
      <div className="text-[120px] mb-10">:(</div>
      <h1 className="text-3xl mb-10 max-w-3xl">
        Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
      </h1>
      <div className="text-xl mb-10">0% complete</div>
      <div className="flex gap-10 items-start">
        <div className="w-32 h-32 bg-white" />
        <div>
          <p className="mb-2">For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
          <p className="text-sm opacity-70">If you call a support person, give them this info:</p>
          <p className="text-sm opacity-70">Stop code: GHOST_DOME_CRITICAL_FAILURE</p>
        </div>
      </div>
    </div>
  );

  const renderSonicGame = () => (
    <div className="fixed inset-0 bg-black z-[1700] flex flex-col items-center justify-center text-white font-mono">
      <div className="mb-8 text-center">
        <h2 className="text-red-600 text-4xl font-black mb-2 italic">SONIC.EXE</h2>
        <p className="text-gray-400">PRESS [RIGHT ARROW] TO RUN TO THE TUNNEL!</p>
      </div>
      
      <div className="w-full max-w-4xl h-64 bg-gray-900 relative rounded-xl border-4 border-red-900 overflow-hidden">
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-8 bg-green-900" />
        
        {/* Sonic */}
        <motion.div 
          className="absolute bottom-8 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center border-2 border-white"
          style={{ left: `${sonicPos}%` }}
        >
          <div className="text-[10px] font-bold">SONIC</div>
        </motion.div>
        
        {/* Tunnel */}
        <div className="absolute bottom-8 right-0 w-24 h-32 bg-black border-l-8 border-red-600 flex items-center justify-center">
          <span className="text-xs text-red-600 font-bold">TUNNEL</span>
        </div>
      </div>
      
      <div className="mt-8 w-full max-w-4xl bg-gray-800 h-4 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-red-600"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </div>
  );

  const renderWinScreen = () => (
    <div className="fixed inset-0 bg-green-900 z-[1800] flex flex-col items-center justify-center text-white text-center p-10">
      <h1 className="text-6xl font-black mb-6">YOU WON!</h1>
      <p className="text-2xl mb-10">You reached the tunnel in time. Here are your 100M subscribers!</p>
      <button 
        onClick={() => setStage('SCAMMED_SCREEN')}
        className="bg-white text-green-900 px-10 py-4 rounded-full font-black text-2xl hover:bg-gray-200"
      >
        GO TO FAKE TAB
      </button>
    </div>
  );

  const renderLoseScreen = () => null; // Replaced by new sequence

  const renderLoseFlashingFast = () => (
    <motion.div 
      className="fixed inset-0 z-[2100]"
      animate={{ 
        backgroundColor: ['#ff0000', '#000000', '#ffffff', '#ff0000'],
      }}
      transition={{ duration: 0.1, repeat: Infinity }}
    />
  );

  const renderLoseFlashingSlow = () => (
    <div className="fixed inset-0 z-[2300] bg-black flex flex-col items-center justify-center">
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          backgroundColor: ['#440000', '#000000', '#222222', '#440000'],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 19 }}
        onClick={() => setStage('BLACK_OUT')}
        className="relative z-10 bg-white text-black px-12 py-4 rounded-full font-black text-2xl hover:bg-gray-200"
      >
        BACK TO START
      </motion.button>
    </div>
  );

  const renderSonicLoseThx = () => (
    <div className="fixed inset-0 bg-black z-[2400] flex items-center justify-center text-white text-center p-10">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-black uppercase italic"
      >
        thx for download
      </motion.h1>
    </div>
  );

  const renderSonicLoseWhite = () => (
    <div className="fixed inset-0 bg-white z-[2500]" />
  );

  const renderSonicLoseRed = () => (
    <div className="fixed inset-0 bg-red-700 z-[2600] flex flex-col items-center justify-center text-white text-center p-10">
      <h1 className="text-8xl font-black mb-6 italic">YOU LOSE</h1>
      <p className="text-3xl font-bold opacity-80">Sonic.exe caught you.</p>
    </div>
  );

  const renderScammedScreen = () => (
    <div className="fixed inset-0 bg-[#0f0f0f] z-[1900] text-white overflow-y-auto">
      <nav className="bg-[#0f0f0f] h-14 flex items-center px-4 border-b border-[#303030] justify-between">
        <div className="flex items-center gap-4">
          <Youtube className="text-red-600 w-8 h-8 fill-current" />
          <span className="font-bold text-xl">YouTube</span>
        </div>
        <div 
          className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => {
            alert('sorry you got scammed by Matt');
            setNoSignalCount(2);
            setStage('NO_SIGNAL');
          }}
        >
          <User className="w-5 h-5" />
        </div>
      </nav>
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">100,000,000 SUBSCRIBERS</h1>
        <div className="w-64 h-64 bg-yellow-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(234,179,8,0.5)]">
          <span className="text-6xl font-black text-black">100M</span>
        </div>
        <p className="text-gray-400">Click your profile to see settings</p>
      </div>
    </div>
  );

  const renderFinalBonzi = () => (
    <div className="fixed inset-0 bg-[#0078d4] z-[2000] overflow-hidden">
      <img 
        src="https://picsum.photos/seed/ghostdome/1920/1080" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
        alt="Ghost Dome Background"
        referrerPolicy="no-referrer"
      />
      
      {/* Bonzi Buddy */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="absolute top-1/4 left-1/4 cursor-grab active:cursor-grabbing"
      >
        <div className="bg-purple-600 p-4 rounded-xl shadow-2xl border-4 border-white text-center">
          <div className="w-24 h-24 bg-purple-400 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-4xl">🦍</span>
          </div>
          <p className="font-bold text-white">Bonzi Buddy</p>
          <div className="mt-2 bg-white text-black p-2 rounded text-xs">
            welcome to ghost Dome haha
          </div>
        </div>
      </motion.div>

      {/* Kinto Pet */}
      <motion.div 
        drag
        className="absolute bottom-1/4 right-1/4 cursor-grab active:cursor-grabbing"
      >
        <div className="bg-emerald-600 p-4 rounded-xl shadow-2xl border-4 border-white text-center">
          <div className="w-24 h-24 bg-emerald-400 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-4xl">🐱</span>
          </div>
          <p className="font-bold text-white">Kinto Pet</p>
          <div className="mt-2 bg-white text-black p-2 rounded text-xs">
            welcome to ghost Dome haha
          </div>
        </div>
      </motion.div>

      <div className="absolute top-10 w-full text-center">
        <h1 className="text-white text-6xl font-black italic drop-shadow-2xl">GHOST DOME SYSTEM</h1>
      </div>

      <button 
        onClick={() => setStage('BLACK_OUT')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200"
      >
        RESTART SYSTEM
      </button>
    </div>
  );

  const renderPassword = () => (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center z-[700] p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-8">Welcome Back</h2>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-white/10 border border-white/20 rounded-lg py-4 px-6 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-6 h-6" />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors"
          >
            Unlock System
          </button>
        </form>
        <p className="text-gray-500 mt-6 text-sm italic">Hint: 1111</p>
      </div>
    </div>
  );

  const renderFbiScreen = () => (
    <div className="fixed inset-0 bg-red-900 flex flex-col items-center justify-center z-[800] p-6 text-white text-center overflow-hidden">
      {/* FBI Logo Placeholder */}
      <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mb-8 border-8 border-blue-900 shadow-2xl">
        <div className="text-blue-900 font-black text-6xl">FBI</div>
      </div>
      
      <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">FEDERAL BUREAU OF INVESTIGATION</h1>
      <h2 className="text-3xl font-bold text-yellow-400 mb-8 uppercase">YOUR FILES HAVE BEEN COMPROMISED</h2>
      
      <div className="bg-black/40 p-8 rounded-2xl border-2 border-white/20 max-w-2xl">
        <p className="text-xl mb-6">
          This computer has been locked due to illegal activity. All your personal data, photos, and documents have been uploaded to our servers for investigation.
        </p>
        <div className="flex flex-col items-center">
          <span className="text-sm uppercase tracking-widest text-gray-400 mb-2">System Shutdown In</span>
          <span className="text-8xl font-mono font-black text-red-500">{countdown}</span>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <div className="w-4 h-4 bg-red-600 rounded-full" />
        <div className="w-4 h-4 bg-blue-600 rounded-full" />
        <div className="w-4 h-4 bg-red-600 rounded-full" />
      </motion.div>
    </div>
  );

  const renderShutdown = () => (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[900] text-white p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4">Thanks for downloading the 100m subs Virus by Matt</h1>
        <p className="text-gray-500 italic">Shutting down...</p>
      </motion.div>
    </div>
  );

  const renderBlackOut = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[1000]">
      <button 
        onClick={() => {
          setStage('LANDING');
          setDownloadProgress(0);
          setPassword('');
          setPasswordAttempts(0);
          setCountdown(10);
        }}
        className="text-gray-800 hover:text-white transition-colors font-mono text-sm"
      >
        [ CLICK TO RESTART SYSTEM ]
      </button>
    </div>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {stage === 'LANDING' && renderLanding()}
        {stage === 'DOWNLOADING' && renderDownloading()}
        {stage === 'FLASHING' && renderFlashing()}
        {stage === 'REPAIR_PROMPT' && renderRepairPrompt()}
        {stage === 'ANTIVIRUS_INSTALL' && renderAntivirusInstall()}
        {stage === 'CENTRAL_CEE' && renderCentralCee()}
        {stage === 'NO_SIGNAL' && renderNoSignal()}
        {stage === 'PASSWORD' && renderPassword()}
        {stage === 'FBI_SCREEN' && renderFbiScreen()}
        {stage === 'SHUTDOWN' && renderShutdown()}
        {stage === 'BLACK_OUT' && renderBlackOut()}
        {stage === 'WINDOWS_11' && renderWindows11()}
        {stage === 'GHOST_DOME_SCARY' && renderGhostDomeScary()}
        {stage === 'GHOST_DOME_THREAT' && renderGhostDomeThreat()}
        {stage === 'GHOST_DOME_COMPROMISED' && renderGhostDomeCompromised()}
        {stage === 'GHOST_DOME_FLASHING' && renderGhostDomeFlashing()}
        {stage === 'BSOD' && renderBsod()}
        {stage === 'SONIC_GAME' && renderSonicGame()}
        {stage === 'WIN_SCREEN' && renderWinScreen()}
        {stage === 'LOSE_SCREEN' && renderLoseScreen()}
        {stage === 'SCAMMED_SCREEN' && renderScammedScreen()}
        {stage === 'FINAL_BONZI' && renderFinalBonzi()}
        {stage === 'LOSE_FLASHING_FAST' && renderLoseFlashingFast()}
        {stage === 'MOCKING_MESSAGE' && <MockingMessage setStage={setStage} />}
        {stage === 'LOSE_FLASHING_SLOW' && renderLoseFlashingSlow()}
        {stage === 'SONIC_LOSE_THX' && renderSonicLoseThx()}
        {stage === 'SONIC_LOSE_WHITE' && renderSonicLoseWhite()}
        {stage === 'SONIC_LOSE_RED' && renderSonicLoseRed()}
      </AnimatePresence>

      {/* Music Player */}
      <audio 
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/10/14/audio_9939f603f7.mp3" 
        loop 
      />

      {/* Start Overlay for Audio */}
      {!hasStarted && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-center"
          >
            <Youtube className="w-24 h-24 text-red-600 mb-6 mx-auto" />
            <h1 className="text-4xl font-black mb-8">YOUTUBE SUBS GENERATOR</h1>
            <button
              onClick={() => setHasStarted(true)}
              className="bg-red-600 text-white px-12 py-6 rounded-full font-black text-3xl hover:bg-red-700 transition-colors shadow-[0_0_50px_rgba(220,38,38,0.5)]"
            >
              CLICK TO START
            </button>
            <p className="mt-8 text-gray-500 font-bold uppercase tracking-widest">Central Cee - Doja (Drill Remix) Playing</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function MockingMessage({ setStage }: { setStage: (stage: PrankStage) => void }) {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[2200] flex flex-col items-center justify-center text-white p-10 text-center overflow-hidden">
      <motion.h1 
        className="text-4xl md:text-6xl font-black text-red-600 leading-tight"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        HAHAHAHAHAHAHAHAHAHAHAHA LOL YOU COPMUTER IS COOKED BY 100M SUBS VIRUS NOW YOU NO NOT TO DOWNLOAD FREE SUBS OR FOLLOWERS HAHA
      </motion.h1>
      
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setStage('BLACK_OUT')}
          className="mt-12 bg-white text-black px-12 py-4 rounded-full font-black text-2xl hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
          BACK TO START
        </motion.button>
      )}
    </div>
  );
}
