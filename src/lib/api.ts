export const apiURL = `https://amt.santar.store`;

export async function fetchApi(
  url: string,
  method: string = "GET",
  headers: Record<string, string> = {},
  body: any = null
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  return response.json();
}
