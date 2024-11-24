import { useDebounce } from "@uidotdev/usehooks";
import { createRef, useCallback, useEffect, useRef, useState } from "react";

export const useInfiniteScroll = ({
  isValidating,
  ended,
  size,
  setSize,
}: {
  isValidating: boolean;
  ended: any;
  size: number;
  setSize: any;
}) => {
  const intersectionRef = createRef<any>();
  const observerLoader = useRef<any>();

  const loadMore = useCallback(
    (entries: any) => {
      if (!isValidating && entries[0].isIntersecting && !ended) {
        setSize(size + 1);
      }
    },
    [isValidating, ended, size, setSize]
  );

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();

    observerLoader.current = new IntersectionObserver(loadMore, {
      threshold: 0.1,
    });
    

    if (intersectionRef.current) observerLoader.current.observe(intersectionRef.current);


  }, [intersectionRef, loadMore]);
  return { intersectionRef };
};
