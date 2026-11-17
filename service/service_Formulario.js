import { processarContato } from "./service_Contato";

export function enviarFormularioContato(contato) {
  return processarContato(contato);
}