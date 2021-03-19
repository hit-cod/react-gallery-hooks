import s from './Modal.module.css';
import { useEffect, useCallback } from 'react';

function Modal({ lgImg, altOfImage, onClick }) {
  const handleClick = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        onClick();
      }

      if (e.code === 'Escape') {
        onClick();
      }
    },
    [onClick],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleClick);

    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  }, [handleClick]);

  return (
    <div className={s.Overlay} onClick={handleClick} tabIndex="0">
      <div className={s.Modal}>
        <img src={lgImg} alt={altOfImage} />
      </div>
    </div>
  );
}

export default Modal;
