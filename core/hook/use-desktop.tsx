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

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", e => updateTarget(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetReached;
};

export default useDesktop;
