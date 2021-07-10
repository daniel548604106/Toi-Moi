import { useState, useEffect } from 'react';
const useNotify = (text) => {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [text]);
  return { text, isShow };
};

export default useNotify;
