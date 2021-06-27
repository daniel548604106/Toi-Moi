import { useEffect } from 'react';

const useClickAway = ({ ref, handleClick }) => {
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick(event);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [ref.current]);
};

export default useClickAway;
