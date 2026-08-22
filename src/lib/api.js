export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

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
