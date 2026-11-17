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
          <h2 className="sr-only">Buscar perfil do GitHub</h2>
        </header>
        <BuscarGitHub />
      </section>
    </main>
  );
}
