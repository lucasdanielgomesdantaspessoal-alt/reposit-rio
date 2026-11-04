'use client';

import { useState } from 'react';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleAdicionarTarefa = (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
    setNovaTarefa('');
    setMensagem('');
  };

  const handleRemoverTarefa = (indiceRemovido) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((_, indice) => indice !== indiceRemovido)
    );
    setMensagem('');
  };

  const handleVerificarLimite = () => {
    const limiteMinimo = 5;

    if (tarefas.length < limiteMinimo) {
      setMensagem(`⚠️ Você adicionou ${tarefas.length} tarefa(s). O limite mínimo exigido é de ${limiteMinimo} tarefas!`);
    } else {
      setMensagem(`✅ Parabéns! Você atingiu o limite mínimo de ${limiteMinimo} tarefas.`);
    }
  };

  return (
    <div className="tasks">
      <form onSubmit={handleAdicionarTarefa} className="tasks-form">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma tarefa..."
        />
        <button id="terceiroBotao" type="submit">
          Adicionar
        </button>
      </form>

      <ul className="tasks-list">
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}{' '}
            <button
              id="quartoBotao"
              type="button"
              onClick={() => handleRemoverTarefa(index)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button
        id="quintoBotao"
        className="tasks-check-button"
        onClick={handleVerificarLimite}
      >
        Verificar Limite
      </button>

      {mensagem && (
        <p
          className={`tasks-message ${
            tarefas.length < 5 ? "tasks-message-warning" : "tasks-message-success"
          }`}
          role="status"
        >
          {mensagem}
        </p>
      )}
    </div>
  );
}