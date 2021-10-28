export const createUserWithImages = async () => {
  const res = await fetch("/api/images");
  const { data } = await res.json();
  return data;
};

export const requestUserInformation = async (id: string) => {
  const res = await fetch(`/api/user?id=${id}`);
  const { data } = await res.json();
  return data;
};
