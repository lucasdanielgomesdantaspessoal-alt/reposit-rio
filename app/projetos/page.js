import Cartao from "../componentes/Cartao";
import { Projetos } from "../componentes/Dados";

export default function ProjetosPage() {
  return (
    <main>
      <h1>Meus projetos</h1>
      <section className="secao" aria-label="Lista de projetos">
        {Projetos.map((projeto) => (
          <Cartao
            key={projeto.id}
            id={projeto.id}
            titulo={projeto.titulo}
            descricao={projeto.descricao}
            tecnologias={projeto.tecnologias}
          />
        ))}
      </section>
    </main>
  );
}
