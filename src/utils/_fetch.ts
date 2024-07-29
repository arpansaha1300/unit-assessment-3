import createRequest, { type RequestOptions } from './createRequest'

export default async function _fetch(url: string, options?: RequestOptions) {
  const request = createRequest(url, options)

  const res = await fetch(request)
  if (res.status === 204) return

  const jsonData = await res.json()

  if (res.status >= 400) {
    throw jsonData
  }

  return jsonData
}
