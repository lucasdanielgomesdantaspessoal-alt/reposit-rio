import { Projetos } from "../../componentes/Dados";

export async function GET() {
  return Response.json(Projetos);
}
