export async function POST(request) {
  let dados;

  try {
    dados = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "O corpo da requisição deve ser um JSON válido." },
        { status: 400 }
      );
    }

    throw error;
  }

  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return Response.json(
      { error: "Informe nome, e-mail e mensagem." },
      { status: 400 }
    );
  }

  const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
  const email = typeof dados.email === "string" ? dados.email.trim() : "";
  const mensagem =
    typeof dados.mensagem === "string" ? dados.mensagem.trim() : "";

  if (!nome || !email || !mensagem) {
    return Response.json(
      { error: "Preencha nome, e-mail e mensagem." },
      { status: 400 }
    );
  }

  if (
    nome.length > 100 ||
    email.length > 254 ||
    mensagem.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return Response.json(
      { error: "Confira os dados informados e tente novamente." },
      { status: 400 }
    );
  }

  return Response.json(
    { message: "Mensagem recebida com sucesso." },
    { status: 201 }
  );
}
