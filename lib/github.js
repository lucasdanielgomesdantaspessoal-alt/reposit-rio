const API_GITHUB = "https://api.github.com";

async function requisitarGithub(caminho) {
  let resposta;

  try {
    resposta = await fetch(`${API_GITHUB}${caminho}`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
  } catch {
    throw new Error("Não foi possível conectar ao GitHub. Verifique sua conexão.");
  }

  if (!resposta.ok) {
    if (resposta.status === 404) {
      throw new Error("Usuário do GitHub não encontrado.");
    }

    if (resposta.status === 403 || resposta.status === 429) {
      throw new Error(
        "O limite de consultas do GitHub foi atingido. Tente novamente mais tarde.",
      );
    }

    throw new Error(`O GitHub respondeu com erro (${resposta.status}).`);
  }

  return resposta.json();
}

export function buscarUsuarioGithub(usuario) {
  return requisitarGithub(`/users/${encodeURIComponent(usuario)}`);
}

export async function buscarRepositoriosGithub(usuario) {
  const repositorios = [];
  let pagina = 1;
  let resultados;

  do {
    resultados = await requisitarGithub(
      `/users/${encodeURIComponent(usuario)}/repos?per_page=100&sort=updated&page=${pagina}`,
    );
    repositorios.push(...resultados);
    pagina += 1;
  } while (resultados.length === 100);

  return repositorios;
}