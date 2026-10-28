"use client";

import { useEffect, useState } from "react";

export default function ProjetoInterativo({ id }) {
  if (id === 1) {
    return <Calculadora />;
  }

  if (id === 2) {
    return <JogoAdivinhacao />;
  }

  return null;
}

function Calculadora() {
  const [primeiroNumero, setPrimeiroNumero] = useState("");
  const [segundoNumero, setSegundoNumero] = useState("");
  const [operacao, setOperacao] = useState("adicao");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  function calcular(evento) {
    evento.preventDefault();

    if (primeiroNumero.trim() === "" || segundoNumero.trim() === "") {
      setErro("Informe os dois números.");
      setResultado(null);
      return;
    }

    const primeiro = Number(primeiroNumero);
    const segundo = Number(segundoNumero);

    if (!Number.isFinite(primeiro) || !Number.isFinite(segundo)) {
      setErro("Informe números válidos.");
      setResultado(null);
      return;
    }

    if (operacao === "divisao" && segundo === 0) {
      setErro("Não é possível dividir por zero.");
      setResultado(null);
      return;
    }

    const resultados = {
      adicao: primeiro + segundo,
      subtracao: primeiro - segundo,
      multiplicacao: primeiro * segundo,
      divisao: primeiro / segundo,
    };
    const valorCalculado = resultados[operacao];

    if (!Number.isFinite(valorCalculado)) {
      setErro("O resultado não é um número válido.");
      setResultado(null);
      return;
    }

    setErro("");
    setResultado(valorCalculado);
  }

  return (
    <section className="project-interactive" aria-labelledby="calculadora-titulo">
      <h2 id="calculadora-titulo">Calculadora</h2>
      <form className="interactive-form" onSubmit={calcular}>
        <label>
          Primeiro número
          <input
            type="number"
            step="any"
            value={primeiroNumero}
            onChange={(evento) => setPrimeiroNumero(evento.target.value)}
          />
        </label>
        <label>
          Operação
          <select
            value={operacao}
            onChange={(evento) => setOperacao(evento.target.value)}
          >
            <option value="adicao">Adição (+)</option>
            <option value="subtracao">Subtração (−)</option>
            <option value="multiplicacao">Multiplicação (×)</option>
            <option value="divisao">Divisão (÷)</option>
          </select>
        </label>
        <label>
          Segundo número
          <input
            type="number"
            step="any"
            value={segundoNumero}
            onChange={(evento) => setSegundoNumero(evento.target.value)}
          />
        </label>
        <button type="submit">Calcular</button>
      </form>
      {erro && <p className="interactive-error" role="alert">{erro}</p>}
      {resultado !== null && (
        <p className="interactive-result" role="status">
          Resultado: {resultado.toLocaleString("pt-BR", { maximumFractionDigits: 10 })}
        </p>
      )}
    </section>
  );
}

function JogoAdivinhacao() {
  const [numeroSecreto, setNumeroSecreto] = useState(null);
  const [palpite, setPalpite] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [acertou, setAcertou] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNumeroSecreto(Math.floor(Math.random() * 101));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function novoJogo() {
    setNumeroSecreto(Math.floor(Math.random() * 101));
    setPalpite("");
    setMensagem("");
    setTentativas(0);
    setAcertou(false);
  }

  function verificarPalpite(evento) {
    evento.preventDefault();

    if (numeroSecreto === null || palpite.trim() === "") {
      setMensagem("Informe um número entre 0 e 100.");
      return;
    }

    const numero = Number(palpite);
    if (!Number.isInteger(numero) || numero < 0 || numero > 100) {
      setMensagem("Digite um número inteiro entre 0 e 100.");
      return;
    }

    const totalTentativas = tentativas + 1;
    setTentativas(totalTentativas);

    if (numero === numeroSecreto) {
      setMensagem(`Você acertou em ${totalTentativas} tentativa(s)!`);
      setAcertou(true);
    } else if (numero < numeroSecreto) {
      setMensagem("O número secreto é maior. Tente novamente!");
    } else {
      setMensagem("O número secreto é menor. Tente novamente!");
    }
  }

  return (
    <section className="project-interactive" aria-labelledby="adivinhacao-titulo">
      <h2 id="adivinhacao-titulo">Jogo da adivinhação</h2>
      <p>Tente descobrir o número aleatório escolhido pelo sistema, de 0 a 100.</p>
      <form className="interactive-form guessing-form" onSubmit={verificarPalpite}>
        <label>
          Seu palpite
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={palpite}
            onChange={(evento) => setPalpite(evento.target.value)}
            disabled={numeroSecreto === null || acertou}
          />
        </label>
        <button type="submit" disabled={numeroSecreto === null || acertou}>
          Verificar palpite
        </button>
      </form>
      {numeroSecreto === null ? (
        <p role="status">Preparando um novo número...</p>
      ) : (
        <p className="guess-attempts">Tentativas: {tentativas}</p>
      )}
      {mensagem && (
        <p className={acertou ? "interactive-result" : "guess-message"} role="status">
          {mensagem}
        </p>
      )}
      <button className="new-game-button" type="button" onClick={novoJogo}>
        Novo jogo
      </button>
    </section>
  );
}
