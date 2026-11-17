import { salvarTarefa } from "@/componentes/Tarefas.js";

export async function processarTarefa(dados) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw new Error("Informe um título para a tarefa.");
  }

  const titulo = typeof dados.titulo === "string" ? dados.titulo.trim() : "";
  const descricao = typeof dados.descricao === "string" ? dados.descricao.trim() : "";

  if (!titulo) {
    throw new Error("Preencha o título da tarefa.");
  }

  if (titulo.length > 100 || descricao.length > 500) {
    throw new Error("Confira os dados informados e tente novamente.");
  }

  await salvarTarefa({ titulo, descricao });

  return { message: "Tarefa criada com sucesso." };
}