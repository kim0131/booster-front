import { mediaQuery } from "@core/config/media-query";
import { useCallback, useEffect, useState } from "react";

const useDesktop = () => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(mediaQuery[2]);
    media.addEventListener("change", e => updateTarget(e));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", e => updateTarget(e));
  }, []);

  return targetReached;
};

export default useDesktop;
