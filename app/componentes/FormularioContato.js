"use client";

import { useState } from "react";

export default function FormularioContato() {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function enviarContato(evento) {
    evento.preventDefault();
    setErro("");
    setSucesso("");
    setEnviando(true);

    const formulario = evento.currentTarget;
    const campos = new FormData(formulario);

    const contato = {
      nome: campos.get("nome"),
      email: campos.get("email"),
      mensagem: campos.get("mensagem"),
    };

    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contato),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.error || "Não foi possível enviar a mensagem.");
      }

      formulario.reset();
      setSucesso(resultado.message);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a mensagem. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={enviarContato}>
      <label htmlFor="contato-nome">Nome</label>
      <input
        id="contato-nome"
        name="nome"
        type="text"
        autoComplete="name"
        maxLength={100}
        required
      />

      <label htmlFor="contato-email">E-mail</label>
      <input
        id="contato-email"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        required
      />

      <label htmlFor="contato-mensagem">Mensagem</label>
      <textarea
        id="contato-mensagem"
        name="mensagem"
        rows={6}
        maxLength={5000}
        required
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar mensagem"}
      </button>

      {erro && (
        <p className="contact-error" role="alert">
          {erro}
        </p>
      )}
      {sucesso && (
        <p className="contact-success" role="status">
          {sucesso}
        </p>
      )}
    </form>
  );
}