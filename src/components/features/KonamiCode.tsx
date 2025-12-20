import { useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export const useKonamiCode = (onActivate: () => void) => {
  useEffect(() => {
    let currentIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key === KONAMI_CODE[currentIndex]) {
        currentIndex++;
        
        if (currentIndex === KONAMI_CODE.length) {
          onActivate();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onActivate]);
};

export default useKonamiCode;
