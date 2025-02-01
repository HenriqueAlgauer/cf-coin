const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Para React + Vite
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Para Next.js

export async function createUser(userData) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar usuário");
  }

  return response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login inválido");
  }

  return response.json();
}
