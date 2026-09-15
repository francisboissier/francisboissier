import { useEffect, useRef } from "react";

export function useMountEffect(effect: () => void | (() => void)) {
  const latest = useRef(effect);

  useEffect(() => latest.current(), []);
}
