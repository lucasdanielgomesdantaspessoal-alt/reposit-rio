"use client";

import { useState } from "react";

export default function BuscaCep() {
  const [cep, setCep] = useState("");
  const [erro, setErro] = useState("");

  function buscarCep(event) {
    event.preventDefault();

    if (!/^\d{8}$/.test(cep)) {
      setErro("CEP inválido. Digite os 8 números do CEP.");
      return;
    }

    setErro("");
    const cepFormatado = `${cep.slice(0, 5)}-${cep.slice(5)}`;
    const consulta = encodeURIComponent(`CEP ${cepFormatado}, Brasil`);
    window.location.assign(
      `https://www.google.com/maps/search/?api=1&query=${consulta}`,
    );
  }

  return (
    <form className="cep-search" onSubmit={buscarCep} noValidate>
      <label htmlFor="cep">Digite um CEP brasileiro</label>
      <div className="cep-search-controls">
        <input
          id="cep"
          name="cep"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={8}
          placeholder="Ex.: 01001000"
          value={cep}
          onChange={(event) => {
            setCep(event.target.value.replace(/\D/g, "").slice(0, 8));
            setErro("");
          }}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? "cep-error" : undefined}
        />
        <button type="submit">Buscar no Google Maps</button>
      </div>
      {erro && (
        <p id="cep-error" className="cep-error" role="alert">
          {erro}
        </p>
      )}
    </form>
  );
}
