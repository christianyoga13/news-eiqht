"use client";
import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const computedStyle = hoveredElement ? window.getComputedStyle(hoveredElement).cursor : 'default';
      setIsPointer(computedStyle === 'pointer');
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', updateCursorType);
    };
  }, [position]);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: 'white', // Warna titik tetap putih
        }}
      />
      <div
        className="custom-cursor-border"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '80px' : '50px', // Lebih besar saat pointer
          height: isPointer ? '80px' : '50px', // Lebih besar saat pointer
          border: isPointer ? '0px' : '2px solid white', // Border putih
          backgroundColor: isPointer ? 'rgba(128, 128, 128, 0.5)' : 'transparent', 
          transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out, background-color 0.3s ease-in-out, border 0.3s ease-in-out',
        }}
      />
    </>
  );
};

export default CustomCursor;