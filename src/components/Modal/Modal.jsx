import React from 'react';
import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root-modal');

export default function Modal({ imageUrl, onClose }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
};
