import { useEffect } from "react";

export type EventListnerFunc = (event: MouseEvent) => void;

export const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement>,
  handleOutsideClick: EventListnerFunc
) => {
  useEffect(() => {
    const handler: EventListnerFunc = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleOutsideClick(event);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref, handleOutsideClick]);
};

export const getFromStorage = (id: number, fallback: number[]) => {
  const data = sessionStorage.getItem(id.toString());
  return data != null ? JSON.parse(data) : fallback;
};

export const setStorage = (id: number, data: number[]) => {
  sessionStorage.setItem(id.toString(), JSON.stringify(data));
};
