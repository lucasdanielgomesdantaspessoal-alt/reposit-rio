export default function Cabecalho() {
  return (
    <header className="hero-header">
      <div className="hero-content">
        <p className="eyebrow">Portfólio pessoal</p>
        <h1>Lucas Daniel</h1>
        <p className="hero-subtitle">
          Desenvolvedor web em formação, criando interfaces modernas e
          experiências digitais claras.
        </p>
        <div className="hero-actions">
          <a href="#projetos" className="primary-button">
            Ver projetos
          </a>
          <a href="#tarefas" className="secondary-button">
            Tarefas
          </a>
        </div>
      </div>
    </header>
  );
}