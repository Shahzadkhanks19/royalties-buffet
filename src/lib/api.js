export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(payload?.message || "Something went wrong. Please try again.");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function postJson(path, body) {
  return apiRequest(path, { method: "POST", body: JSON.stringify(body) });
}

export function putJson(path, body) {
  return apiRequest(path, { method: "PUT", body: JSON.stringify(body) });
}

export function patchJson(path, body) {
  return apiRequest(path, { method: "PATCH", body: JSON.stringify(body) });
}

export function deleteJson(path) {
  return apiRequest(path, { method: "DELETE" });
}
