import { useEffect } from "react";

const useDebounce = (callbackHandler, options = { delay: 500 }) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callbackHandler();
    }, options.delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callbackHandler, options.delay]);
};

export default useDebounce;
