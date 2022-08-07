//TODO Delete this?

export const getFromStorage = (id: number, fallback: number[]) => {
  const data = sessionStorage.getItem(id.toString());
  return data != null ? JSON.parse(data) : fallback;
};

export const setStorage = (id: number, data: number[]) => {
  sessionStorage.setItem(id.toString(), JSON.stringify(data));
};
