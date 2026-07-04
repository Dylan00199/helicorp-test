/**
 * API SKELETON
 * =============
 * No backend exists yet. Every function below is a typed, documented stub
 * that resolves with a mocked response after a short delay, so the UI
 * (loading / success / error states) can be built and demoed end-to-end
 * before a real API exists.
 *
 * To wire up a real backend:
 *   1. Set VITE_API_BASE_URL in `.env` (see `.env.example`).
 *   2. Replace the body of each function with a real `request()` call.
 *   3. Keep the same return shape so calling components don't need changes.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const MOCK_LATENCY_MS = 700

/**
 * Thin fetch wrapper: JSON in, JSON out, throws on non-2xx. Exported for
 * any future endpoint that doesn't need its own named wrapper function.
 */
export async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText)
    throw new Error(message || `Request failed with status ${res.status}`)
  }

  const contentType = res.headers.get('content-type') ?? ''
  return contentType.includes('application/json') ? res.json() : res.text()
}

function mockResolve(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), MOCK_LATENCY_MS))
}

/**
 * FR10 -- Contact (Agent) form submission.
 * Expected fields: name, phone, email, company, jobTitle, message
 *
 * TODO(backend): replace with
 *   return request('/contact/agent', { method: 'POST', body: payload })
 */
export async function submitAgentContact(payload) {
  console.info('[api:mock] submitAgentContact', payload)
  return mockResolve({ ok: true, id: `mock_agent_${Date.now()}` })
}

/**
 * FR11 -- Contact (Supplier) form submission.
 * Expected fields: name, phone, email, company, productCategory, message
 *
 * TODO(backend): replace with
 *   return request('/contact/supplier', { method: 'POST', body: payload })
 */
export async function submitSupplierContact(payload) {
  console.info('[api:mock] submitSupplierContact', payload)
  return mockResolve({ ok: true, id: `mock_supplier_${Date.now()}` })
}

/**
 * FR08 -- Job listings. Currently backed by `src/data/jobs.js`.
 *
 * TODO(backend): replace with
 *   return request('/jobs')
 */
export async function fetchJobs() {
  const { jobs } = await import('../data/jobs.js')
  return mockResolve(jobs)
}

/**
 * FR09 -- News / blog listings. Currently backed by `src/data/news.js`.
 *
 * TODO(backend): replace with
 *   return request('/news')
 */
export async function fetchNews() {
  const { news } = await import('../data/news.js')
  return mockResolve(news)
}
