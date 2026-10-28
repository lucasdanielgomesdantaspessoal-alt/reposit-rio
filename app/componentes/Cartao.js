"use client";
import { useState } from "react";
import Link from "next/link";

export default function Cartao({ id, titulo, descricao, tecnologias }) {
  const [curtidas, setCurtidas] = useState(0);
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [aviso, setAviso] = useState("");
  ;

  function enviar(e) {
    e.preventDefault();
    if (nome.trim().length < 3) {
      setAviso("Digite seu nome completo.");
      return;
    }
    setAviso(`Obrigado, ${nome}!`);
    setNome("");
  }
  return (
    <div className="cartao">
      <h2>{titulo}</h2>
      <p>{descricao}</p>
      <ul className="tecnologias">
        {tecnologias.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <button id="primeiroBotao" onClick={() => setCurtidas(curtidas + 1)}>
        ❤️ {curtidas} Curtidas
      </button>

      <button id="segundoBotao" onClick={() => setAberto(!aberto)}>
        {aberto ? "Esconder" : "Ver detalhes"}
      </button>
      {aberto && <p>Adicionar alguma descrição.</p>}
      <Link className="project-link" href={`/projetos/${id}`}>
        Abrir projeto
      </Link>
      <form onSubmit={enviar} style={{ marginTop: "20px" }}>
        <input 
          type="text" 
          placeholder="Digite seu nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>     
      <p>{aviso}</p>
    </div>
  );
}