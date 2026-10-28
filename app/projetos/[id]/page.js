import Link from "next/link";
import { notFound } from "next/navigation";
import { Projetos } from "../../componentes/Dados";
import ProjetoInterativo from "../../componentes/ProjetoInterativo";

export function generateStaticParams() {
  return Projetos.map((projeto) => ({ id: String(projeto.id) }));
}

export default async function ProjetoPage({ params }) {
  const { id } = await params;
  const projeto = Projetos.find((item) => item.id === Number(id));

  if (!projeto) {
    notFound();
  }

  return (
    <main className="project-details">
      <Link href="/projetos">← Voltar aos projetos</Link>
      <h1>{projeto.titulo}</h1>
      <p>{projeto.descricao}</p>
      <ProjetoInterativo id={projeto.id} />
      <h2>Tecnologias utilizadas</h2>
      <ul className="tecnologias">
        {projeto.tecnologias.map((tecnologia) => (
          <li key={tecnologia}>{tecnologia}</li>
        ))}
      </ul>
    </main>
  );
}
