const BASE_URL = `${import.meta.env.BASE_URL}api`.replace(/\/\//g, '/');

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${window.location.origin}${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  signup: (data: { email: string; password: string; name: string }) =>
    apiFetch<any>("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  getProfile: (userId: string) => apiFetch<any>(`/profile?userId=${encodeURIComponent(userId)}`),
  upsertProfile: (data: any) => apiFetch<any>("/profile", { method: "POST", body: JSON.stringify(data) }),
  getConfig: (userId: string) => apiFetch<any>(`/config?userId=${encodeURIComponent(userId)}`),
  upsertConfig: (data: any) => apiFetch<any>("/config", { method: "POST", body: JSON.stringify(data) }),
  getQuizResults: (userId: string) => apiFetch<any[]>(`/quiz?userId=${encodeURIComponent(userId)}`),
  saveQuizResult: (data: any) => apiFetch<any>("/quiz", { method: "POST", body: JSON.stringify(data) }),
  getSessions: (userId: string) => apiFetch<any[]>(`/sessions?userId=${encodeURIComponent(userId)}`),
  saveSession: (data: any) => apiFetch<any>("/sessions", { method: "POST", body: JSON.stringify(data) }),
};
