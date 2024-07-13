export async function getData(query: string, init?: RequestInit | undefined) {
  const requestOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default",
    ...init,
  };

  const res = await fetch(`${process.env.BACKEND_URL}${query}`, requestOptions);

  const data = await res.json();

  if (!res.ok) throw new Error("Failed to fetch data");

  return data;
}