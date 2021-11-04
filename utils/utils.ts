export const createUserWithImages = async () => {
  const res = await fetch("/api/images");
  const { data } = await res.json();
  return data;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json())