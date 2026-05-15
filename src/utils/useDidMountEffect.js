import { useEffect, useRef } from "react";

/**
 * This hooks is used when you wants to not ru your effect when react render first time
 * @param callback callBack fuction when effect must run
 * @param dependances array of dependences which fire effect
 */
export const useDidMountEffect = (callback, dependances) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
    } else {
      didMount.current = true;
    }
  }, dependances);
};
