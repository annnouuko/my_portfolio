'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/Sou2.mp3');
    audioRef.current.loop = true;
    audioRef.current.oncanplaythrough = () => {
      console.log("Аудио готово к проигрыванию");
    };
    audioRef.current.onerror = (e) => {
      console.error("Ошибка загрузки аудио:", e);
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.error("Ошибка воспроизведения аудио:", e);
      });
      setIsPlaying(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center px-4 bg-white">
      <div className="container mx-auto flex items-center justify-between md:justify-center relative">
        
        {/* Кнопка меню для мобилок (чёрный бургер, слева) */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Навигация */}
        <nav
          className={`
            ${isOpen ? 'block' : 'hidden'}
            absolute top-16 left-0 w-full bg-white shadow-md
            md:static md:block md:w-auto md:bg-transparent md:shadow-none
          `}
        >
          <ul className="flex flex-col md:flex-row md:space-x-20 space-y-2 md:space-y-0 p-4 md:p-0">
            <li>
              <Link
                href="/"
                className="text-black border border-black rounded-full px-10 py-2 inline-block text-center text-[20px] font-handjet hover:bg-[#84FF00] hover:text-black transition-colors duration-300"
              >
                домой
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-black border border-black rounded-full px-10 py-2 inline-block text-center text-[20px] font-handjet hover:bg-[#84FF00] hover:text-black transition-colors duration-300"
              >
                обо мне
              </Link>
            </li>
            <li>
              <Link
                href="/works"
                className="text-black border border-black rounded-full px-10 py-2 inline-block text-center text-[20px] font-handjet hover:bg-[#84FF00] hover:text-black transition-colors duration-300"
              >
                работы
              </Link>
            </li>
            <li>
              <Link
                href="/contacts"
                className="text-black border border-black rounded-full px-10 py-2 inline-block text-center text-[20px] font-handjet hover:bg-[#84FF00] hover:text-black transition-colors duration-300"
              >
                контакты
              </Link>
            </li>
          </ul>
        </nav>

        {/* Кнопка Звук */}
        <button
          onClick={toggleSound}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '8px 16px',
            backgroundColor: isPlaying ? '#84FF00' : '#ccc',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          aria-pressed={isPlaying}
        >
          {isPlaying ? 'Звук Вкл' : 'Звук Выкл'}
        </button>
      </div>
    </header>
  );
}
