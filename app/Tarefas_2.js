"use client";

import { useEffect, useState } from "react";
import { criarTarefa, ouvirTarefas } from "../lib/tarefas";

export default function Tarefas2() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const unsubscribe = ouvirTarefas((lista) => setTarefas(lista));
    return () => unsubscribe?.();
  }, []);

  async function adicionar(e) {
    e.preventDefault();
    if (!texto.trim()) return;

    await criarTarefa(texto);
    setTexto("");
  }

  return (
    <form onSubmit={adicionar}>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button type="submit">Adicionar</button>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.texto}</li>
        ))}
      </ul>
    </form>
  );
}