const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Para React + Vite
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Para Next.js

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

export async function createUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o usuário.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
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

export async function updateUser(userId, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o usuário.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar o usuário.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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

export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar a tarefa.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
}

export async function getTaskById(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar a tarefa.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateTask(taskId, updatedTask) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar a tarefa.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar a tarefa.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
