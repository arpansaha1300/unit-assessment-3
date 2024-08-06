export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  /** @default 'GET' */
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

  query?: URLSearchParams

  body?: Record<string, any>
}

export const FETCH_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/'

export default function createRequest(
  url: string,
  options: RequestOptions = {}
): Request {
  let headers: RequestOptions['headers'] = {
    'Content-Type': 'application/json',
  }

  if (options.headers) {
    headers = {
      ...options.headers,
      ...headers,
    }
  }

  const body = options.body ? JSON.stringify(options.body) : null

  if (import.meta.env.DEV) {
    options.mode = 'cors'
  }

  const requestUrl = FETCH_BASE_URL + url

  return new Request(requestUrl, {
    ...options,
    credentials: 'include',
    body,
    headers,
  })
}
