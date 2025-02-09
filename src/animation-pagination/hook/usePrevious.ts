import {useRef, useEffect} from 'react';

const usePrevious = (value: any, initialValue?: any) => {
  const ref = useRef(initialValue || '');
  useEffect((): void => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
