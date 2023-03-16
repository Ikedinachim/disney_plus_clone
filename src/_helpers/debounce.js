import { useEffect, useRef, useCallback } from "react";

const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    reset();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [reset]);

  return reset;
};

// function MyComponent({ values, filterOptions, dispatch }) {
//   const resetDebounce = useDebounce(() => {
//     if (values.targetAudienceOption === "mysogidb") {
//       dispatch(getFilteredContactList(filterOptions));
//     }
//   }, 500);

//   useEffect(() => {
//     resetDebounce();
//   }, [resetDebounce, values, filterOptions, dispatch]);

//   // rest of your component code
// }
export default useDebounce;
