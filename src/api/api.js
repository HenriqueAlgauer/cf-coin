const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

// USERS

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

export async function updateUserEmail(userId, newEmail) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail }), // Envia apenas o email
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o email.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getUserProfile(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar perfil do usuário.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
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

// TASKS

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
    console.error(error);
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

export async function getUserTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/user`);
    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas disponíveis.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
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

// COINS

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

export async function getUserPendingCoins(userId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/user/${userId}/pending`
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar solicitações pendentes.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function approveCoin(coinId) {
  try {
    const adminId = Number(
      localStorage.getItem("userId") || sessionStorage.getItem("userId")
    );

    if (!adminId) {
      console.error("AdminId não encontrado no localStorage.");
      throw new Error("AdminId não encontrado no localStorage.");
    }

    const response = await fetch(`${API_BASE_URL}/coins/${coinId}/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminId }), // ✅ Enviando adminId como número
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Erro ao aprovar a solicitação.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function rejectCoin(coinId) {
  try {
    const response = await fetch(`${API_BASE_URL}/coins/${coinId}/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminId: localStorage.getItem("userId") }),
    });

    if (!response.ok) {
      throw new Error("Erro ao rejeitar a solicitação.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function createCoin(coinData) {
  try {
    if (!coinData.userId || isNaN(coinData.userId)) {
      throw new Error("userId não foi fornecido ou é inválido.");
    }

    const response = await fetch(`${API_BASE_URL}/coins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coinData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar solicitação de Coin.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar Coin:", error);
  }
}

export async function getUserCoins(userId) {
  if (!userId) {
    console.error("Erro: userId não foi fornecido.");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/coins/user/${userId}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar as moedas do usuário.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ✅ Atualizar apenas a mensagem de uma solicitação
export async function updateCoin(coinId, newMessage) {
  try {
    if (!coinId) {
      throw new Error("ID da Coin não foi fornecido.");
    }

    const response = await fetch(`${API_BASE_URL}/coins/${coinId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newMessage }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar a mensagem.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar a solicitação:", error);
  }
}

// ✅ Excluir uma solicitação de Coin
export async function deleteCoin(coinId) {
  try {
    if (!coinId) {
      throw new Error("ID da Coin não foi fornecido.");
    }

    const response = await fetch(`${API_BASE_URL}/coins/${coinId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir a solicitação.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao excluir a solicitação:", error);
  }
}

// PRIZES

export async function getPrizes() {
  try {
    const response = await fetch(`${API_BASE_URL}/prizes`);
    if (!response.ok) {
      throw new Error("Erro ao buscar os prêmios.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createPrize(prizeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/prizes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prizeData),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o prêmio.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar prêmio:", error);
  }
}

// ✅ Atualizar um prêmio existente
export async function updatePrize(prizeId, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/prizes/${prizeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o prêmio.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar prêmio:", error);
  }
}

// ✅ Excluir um prêmio
export async function deletePrize(prizeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/prizes/${prizeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir o prêmio.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao excluir prêmio:", error);
  }
}

export async function requestPrize(userId, prizeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/prize-redemptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, prizeId }), // Envia os dados corretamente
    });

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(errorText.error || "Erro ao solicitar resgate.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao solicitar prêmio:", error);
    throw error;
  }
}

export async function getPendingPrizeRequests() {
  try {
    const response = await fetch(`${API_BASE_URL}/prize-redemptions/pending`);
    if (!response.ok) throw new Error("Erro ao buscar solicitações pendentes.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function approvePrizeRequest(requestId) {
  try {
    console.log("Aprovando resgate com ID:", requestId);

    const response = await fetch(
      `${API_BASE_URL}/prize-redemptions/${requestId}/approve`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // <-- Adiciona um body vazio
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao aprovar o resgate:", errorText);
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function rejectPrizeRequest(requestId) {
  try {
    console.log("Rejeitando resgate com ID:", requestId);

    const response = await fetch(
      `${API_BASE_URL}/prize-redemptions/${requestId}/reject`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // <-- Adiciona um body vazio
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao rejeitar o resgate:", errorText);
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
