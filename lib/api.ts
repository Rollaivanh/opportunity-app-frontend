const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  token?: string | null
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unexpected API error");
  }

  return data;
}
