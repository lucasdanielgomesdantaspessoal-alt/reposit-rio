import Cabecalho from "./componentes/Cabecalho";
import Cartao from "./componentes/Cartao";
import Secao from "./componentes/Secao";
import Tarefas from "./componentes/Tarefas";
import { Projetos } from "./componentes/Dados";

export default function Home() {
  return (
    <main className="page-shell">
      <Cabecalho />

      <Secao id="sobre" titulo="Sobre mim" className="info-section">
        <div className="profile-summary">
          <div>
            <p className="eyebrow">Apresentação</p>
            <h2>Olá, eu me chamo Lucas</h2>
            <p>
              Tenho 17 anos e estou me especializando em desenvolvimento web,
              com foco em interfaces modernas, experiências intuitivas e
              soluções funcionais.
            </p>
          </div>

          <div className="highlights" aria-label="Principais informações">
            <div>
              <strong>+1</strong>
              <span>ano de estudo</span>
            </div>
            <div>
              <strong>5+</strong>
              <span>projetos práticos</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>foco em frontend</span>
            </div>
          </div>
        </div>
      </Secao>

      <Secao id="projetos" titulo="Projetos" className="projects-section">
        {Projetos.map((projeto) => (
          <Cartao
            key={projeto.id}
            id={projeto.id}
            titulo={projeto.titulo}
            descricao={projeto.descricao}
            tecnologias={projeto.tecnologias}
          />
        ))}
      </Secao>

      <Secao id="tarefas" titulo="Tarefas" className="tasks-section">
        <Tarefas />
      </Secao>
    </main>
  );
}