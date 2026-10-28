import GithubProfile from "../componentes/GithubProfile";

export default function GithubPage() {
  return (
    <main className="github-page">
      <h1>Meu GitHub</h1>
      <p>Informe seu usuário para ver sua foto e seus repositórios públicos.</p>
      <GithubProfile />
    </main>
  );
}
