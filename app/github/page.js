import BuscarGitHub from "../componentes/BuscarGitHub";

export default function GithubPage() {
  return (
    <main className="github-route">
      <section className="secao github-page">
        <header className="secao-header">
          <p className="section-kicker">Explore o GitHub</p>
          <h1>Perfil do GitHub</h1>
          <p>
            Digite um nome de usuário para ver as informações públicas e os
            repositórios desse perfil.
          </p>
          <h3>Exemplo de usuário: octocat</h3>
        </header>
        <BuscarGitHub />
      </section>
    </main>
  );
}
