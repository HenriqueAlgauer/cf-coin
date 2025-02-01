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

export async function getUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Erro ao buscar as tarefas.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPendingRequests() {
  try {
    const response = await fetch(`${API_BASE_URL}/coins/pending`);
    if (!response.ok) {
      throw new Error("Erro ao buscar solicitações pendentes.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
