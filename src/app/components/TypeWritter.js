import React, { useState, useEffect, useRef } from 'react';

export default function TypeWritter({ text = '', speed = 100, onTypingEnd, start = true }) {
  const [displayedText, setDisplayedText] = useState('');
  const hasTyped = useRef(false); // чтобы не перепечатывать заново

  useEffect(() => {
    if (!start) return; // если не стартуем — ничего не делаем
    if (hasTyped.current) return; // если уже печатали — пропускаем

    setDisplayedText('');
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId);
        hasTyped.current = true;
        if (onTypingEnd) onTypingEnd();
        return;
      }
      setDisplayedText((prev) => prev + text.charAt(currentIndex));
      currentIndex++;
    }, speed);

    return () => clearInterval(intervalId);
  }, [start, text, speed, onTypingEnd]);

  return <>{displayedText}</>;
}
