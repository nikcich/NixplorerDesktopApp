// ContextMenu.js
import React, { useEffect } from 'react';

const ContextMenu = ({ isVisible, top, left, onClose, options, f }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isVisible && !e.target.classList.contains('context-menu-option')) {
        onClose(null);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="context-menu" style={{ top, left }}>
      {options.map((option, index) => (
        <div key={index} className={"context-menu-option " + (index % 2 == 1 ? "optionZebra" : "")} onClick={() => onClose(option.action, f)}>
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
