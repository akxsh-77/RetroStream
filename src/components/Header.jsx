import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <header className="bg-surface p-4 shadow-netflix">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide flex items-center select-none">
  {/* Retro — dark grey gradient */}
  <span
    className="text-transparent bg-clip-text"
    style={{
      backgroundImage: 'linear-gradient(135deg, #d4d4d4, #a3a3a3, #6e6e6e, #3a3a3a)',
      letterSpacing: '0.6px'
    }}
  >
    Retro
  </span>

  {/* Stream— deep dark red */}
  <span
    className="ml-1"
    style={{
      color: '#8B0000',
      letterSpacing: '0.6px'
    }}
  >
    Stream
  </span>

  {/* INFO ICON BUTTON */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="ml-2 text-sm text-text/50 hover:text-text focus:outline-none transition-colors duration-200"
  >
    ⓘ
  </button>
</h1>



        <Navbar />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-surface p-8 rounded-xl shadow-netflix max-w-sm mx-auto relative" onClick={e => e.stopPropagation()}>
  <h2 className="text-2xl font-semibold text-text text-center mb-3">
    RetroStream
  </h2>

  <p className="text-text-secondary text-center mb-1">
    A Movie Discovery & Watchlist Application
  </p>

  <p className="text-text-secondary text-center mb-3 text-sm">
    Built using React, TMDB API & Firebase.
  </p>

  <p className="text-text-secondary text-center text-sm mb-6 tracking-wide">
    Developed by <span className="font-semibold text-text">Akash</span> — 
    <a href="mailto:akxsh.work@gmail.com" className="underline hover:text-primary ml-1">akxsh.work@gmail.com</a>
  </p>

  <button
    onClick={closeModal}
    className="block w-full py-2 px-4 bg-primary hover:bg-primary-hover rounded-md text-text font-semibold focus:outline-none"
  >
    Close
  </button>
</div>

        </div>
      )}
    </header>
  );
};

export default Header;