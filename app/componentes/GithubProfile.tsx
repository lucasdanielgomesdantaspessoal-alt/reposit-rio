"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
};

type GithubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
};

function isGithubUser(value: unknown): value is GithubUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Record<string, unknown>;

  return (
    typeof user.login === "string" &&
    (typeof user.name === "string" || user.name === null) &&
    (typeof user.bio === "string" || user.bio === null) &&
    typeof user.avatar_url === "string" &&
    typeof user.html_url === "string"
  );
}

function isGithubRepository(value: unknown): value is GithubRepository {
  if (!value || typeof value !== "object") return false;
  const repository = value as Record<string, unknown>;

  return (
    typeof repository.id === "number" &&
    typeof repository.name === "string" &&
    (typeof repository.description === "string" ||
      repository.description === null) &&
    typeof repository.html_url === "string" &&
    (typeof repository.language === "string" ||
      repository.language === null) &&
    typeof repository.stargazers_count === "number"
  );
}

async function getGithubResponse(url: string) {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuário do GitHub não encontrado.");
    }

    if (response.status === 403 || response.status === 429) {
      throw new Error(
        "O limite de consultas do GitHub foi atingido. Tente novamente mais tarde.",
      );
    }

    throw new Error(`O GitHub respondeu com erro (${response.status}).`);
  }

  return response.json() as Promise<unknown>;
}

export default function GithubProfile() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<GithubUser | null>(null);
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const account = username.trim();

    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(account)) {
      setError("Digite um nome de usuário válido do GitHub.");
      return;
    }

    setLoading(true);
    setError("");
    setProfile(null);
    setRepositories([]);

    try {
      const [userData, repositoryData] = await Promise.all([
        getGithubResponse(`https://api.github.com/users/${account}`),
        getGithubResponse(
          `https://api.github.com/users/${account}/repos?per_page=100&sort=updated`,
        ),
      ]);

      if (!isGithubUser(userData) || !Array.isArray(repositoryData)) {
        throw new Error("O GitHub retornou dados em um formato inesperado.");
      }

      if (!repositoryData.every(isGithubRepository)) {
        throw new Error("O GitHub retornou uma lista de repositórios inválida.");
      }

      setProfile(userData);
      setRepositories(repositoryData);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível carregar os dados do GitHub.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="github-profile">
      <form className="github-search" onSubmit={searchProfile}>
        <label htmlFor="github-username">Usuário do GitHub</label>
        <div>
          <input
            id="github-username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Ex.: octocat"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Buscar"}
          </button>
        </div>
      </form>

      {error && <p className="github-error" role="alert">{error}</p>}

      {profile && (
        <section className="github-results" aria-live="polite">
          <div className="github-user">
            <Image
              src={profile.avatar_url}
              alt={`Foto de perfil de ${profile.login}`}
              width={144}
              height={144}
              className="github-avatar"
            />
            <div>
              <h2>{profile.name || profile.login}</h2>
              <p>{profile.bio || `@${profile.login}`}</p>
              <a href={profile.html_url} target="_blank" rel="noreferrer">
                Ver perfil no GitHub
              </a>
            </div>
          </div>

          <h2>Repositórios públicos ({repositories.length})</h2>
          {repositories.length > 0 ? (
            <ul className="github-repositories">
              {repositories.map((repository) => (
                <li key={repository.id}>
                  <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repository.name}
                  </a>
                  <p>{repository.description || "Sem descrição."}</p>
                  <span>
                    {repository.language || "Linguagem não informada"} · ⭐{" "}
                    {repository.stargazers_count}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Este usuário ainda não tem repositórios públicos.</p>
          )}
        </section>
      )}
    </div>
  );
}
