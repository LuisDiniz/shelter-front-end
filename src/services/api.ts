const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '')

interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  token?: string | null
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, data: unknown, message = 'API request failed') {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const apiRequest = async <T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> => {
  const { body, headers, token, ...fetchOptions } = options
  const requestHeaders = new Headers(headers)

  let requestBody: BodyInit | undefined
  if (body instanceof FormData) {
    requestBody = body
  } else if (body !== undefined) {
    requestHeaders.set('Content-Type', 'application/json')
    requestBody = JSON.stringify(body)
  }

  if (token) {
    requestHeaders.set('Authorization', `Token ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: requestHeaders,
    body: requestBody,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const responseText = await response.text()
  const data = responseText ? JSON.parse(responseText) : null

  if (!response.ok) {
    throw new ApiError(response.status, data)
  }

  return data as T
}
