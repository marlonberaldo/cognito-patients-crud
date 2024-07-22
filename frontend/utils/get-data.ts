import { getAccessToken } from "./session";

export async function getData(query: string, init?: RequestInit | undefined) {

  const Authorization = await getAccessToken();

  if (!Authorization) {
    throw new Error("No access token");
  }

  const requestOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization
    },
    cache: "default",
    ...init,
  };

  const res = await fetch(`${process.env.BACKEND_URL}${query}`, requestOptions);

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}