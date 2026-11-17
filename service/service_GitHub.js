import {
  buscarRepositoriosGithub,
  buscarUsuarioGithub,
} from "../lib/github";

const service_GitHub = {
  async buscarPerfilCompleto(usuario) {
    const nomeUsuario = typeof usuario === "string" ? usuario.trim() : "";

    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(nomeUsuario)) {
      throw new Error("Digite um nome de usuário válido do GitHub.");
    }

    const [perfil, repositorios] = await Promise.all([
      buscarUsuarioGithub(nomeUsuario),
      buscarRepositoriosGithub(nomeUsuario),
    ]);

    return { ...perfil, repositorios };
  },
};

export default service_GitHub;