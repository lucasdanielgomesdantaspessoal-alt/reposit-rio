import { salvarContato } from "../lib/contato";

export async function processarContato(dados) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw new Error("Informe nome, e-mail e mensagem.");
  }

  const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
  const email = typeof dados.email === "string" ? dados.email.trim() : "";
  const mensagem =
    typeof dados.mensagem === "string" ? dados.mensagem.trim() : "";

  if (!nome || !email || !mensagem) {
    throw new Error("Preencha nome, e-mail e mensagem.");
  }

  if (
    nome.length > 100 ||
    email.length > 254 ||
    mensagem.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error("Confira os dados informados e tente novamente.");
  }

  await salvarContato({ nome, email, mensagem });

  return { message: "Mensagem recebida com sucesso." };
}