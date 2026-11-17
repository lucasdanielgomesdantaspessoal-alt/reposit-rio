"use client";

import { useState } from "react";
import Image from "next/image";
import service_GitHub from "../../service/service_GitHub";

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(data));
}

export default function BuscarGitHub() {
  const [usuario, setUsuario] = useState("");
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function buscarPerfil(event) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resultado = await service_GitHub.buscarPerfilCompleto(usuario);
      setPerfil(resultado);
    } catch (error) {
      setPerfil(null);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="github-profile">
      <form className="github-search" onSubmit={buscarPerfil}>
        <label htmlFor="github-username">Nome de usuário do GitHub</label>
        <div>
          <input
            id="github-username"
            name="username"
            type="text"
            autoComplete="username"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
            placeholder="Ex.: octocat"
            required
            maxLength={39}
          />
          <button type="submit" disabled={carregando}>
            {carregando ? "Buscando..." : "Buscar perfil"}
          </button>
        </div>
      </form>

      {erro && (
        <p className="github-error" role="alert">
          {erro}
        </p>
      )}

      {perfil && (
        <section className="github-results" aria-live="polite">
          <div className="github-user">
            <Image
              className="github-avatar"
              src={perfil.avatar_url}
              alt={`Foto de perfil de ${perfil.login}`}
              width={144}
              height={144}
              unoptimized
            />
            <div className="github-user-details">
              <p className="github-login">@{perfil.login}</p>
              <h2>{perfil.name || perfil.login}</h2>
              <p>{perfil.bio || "Este usuário não informou uma biografia."}</p>
              <a href={perfil.html_url} target="_blank" rel="noreferrer">
                Abrir perfil no GitHub
              </a>
            </div>
          </div>

          <dl className="github-stats" aria-label="Estatísticas do perfil">
            <div>
              <dt>Repositórios públicos</dt>
              <dd>{perfil.public_repos}</dd>
            </div>
            <div>
              <dt>Seguidores</dt>
              <dd>{perfil.followers}</dd>
            </div>
            <div>
              <dt>Seguindo</dt>
              <dd>{perfil.following}</dd>
            </div>
            <div>
              <dt>Gists públicos</dt>
              <dd>{perfil.public_gists}</dd>
            </div>
          </dl>

          <dl className="github-details" aria-label="Informações do usuário">
            {perfil.company && (
              <div>
                <dt>Empresa</dt>
                <dd>{perfil.company}</dd>
              </div>
            )}
            {perfil.location && (
              <div>
                <dt>Localização</dt>
                <dd>{perfil.location}</dd>
              </div>
            )}
            {perfil.blog && (
              <div>
                <dt>Site</dt>
                <dd>
                  <a
                    href={
                      perfil.blog.startsWith("http")
                        ? perfil.blog
                        : `https://${perfil.blog}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {perfil.blog}
                  </a>
                </dd>
              </div>
            )}
            {perfil.email && (
              <div>
                <dt>E-mail público</dt>
                <dd>
                  <a href={`mailto:${perfil.email}`}>{perfil.email}</a>
                </dd>
              </div>
            )}
            {perfil.twitter_username && (
              <div>
                <dt>Twitter</dt>
                <dd>@{perfil.twitter_username}</dd>
              </div>
            )}
            <div>
              <dt>Tipo de conta</dt>
              <dd>{perfil.type}</dd>
            </div>
            <div>
              <dt>Disponível para contratação</dt>
              <dd>{perfil.hireable ? "Sim" : "Não informado"}</dd>
            </div>
            <div>
              <dt>Membro desde</dt>
              <dd>{formatarData(perfil.created_at)}</dd>
            </div>
            <div>
              <dt>Perfil atualizado em</dt>
              <dd>{formatarData(perfil.updated_at)}</dd>
            </div>
          </dl>

          <div className="github-repository-heading">
            <h2>Repositórios públicos</h2>
            <p>{perfil.repositorios.length} encontrados</p>
          </div>
          {perfil.repositorios.length > 0 ? (
            <ul className="github-repositories">
              {perfil.repositorios.map((repositorio) => (
                <li key={repositorio.id}>
                  <a
                    href={repositorio.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repositorio.name}
                  </a>
                  <p>{repositorio.description || "Sem descrição."}</p>
                  <span>
                    {repositorio.language || "Linguagem não informada"} · ⭐{" "}
                    {repositorio.stargazers_count} · Forks{" "}
                    {repositorio.forks_count}
                  </span>
                  {repositorio.license && (
                    <span className="github-license">
                      Licença: {repositorio.license.name}
                    </span>
                  )}
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
