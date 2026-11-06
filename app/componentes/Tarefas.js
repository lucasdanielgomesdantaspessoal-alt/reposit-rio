'use client';

import { useEffect, useState } from 'react';
import {
  criarTarefa,
  ouvirTarefas,
  alternarTarefa,
  removerTarefa,
} from '@/lib/tarefas';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const unsubscribe = ouvirTarefas((lista) => {
      setTarefas(lista);
    });

    return () => unsubscribe?.();
  }, []);

  const handleAdicionarTarefa = async (e) => {
    e.preventDefault();
    const texto = novaTarefa.trim();

    if (!texto) return;

    try {
      await criarTarefa(texto);
      setNovaTarefa('');
      setMensagem('');
    } catch (error) {
      setMensagem('Não foi possível salvar a tarefa. Verifique o banco de dados.');
    }
  };

  const handleRemoverTarefa = async (id) => {
    try {
      await removerTarefa(id);
      setMensagem('');
    } catch (error) {
      setMensagem('Não foi possível remover a tarefa.');
    }
  };

  const handleAlternarTarefa = async (id, feita) => {
    try {
      await alternarTarefa(id, feita);
    } catch (error) {
      setMensagem('Não foi possível atualizar o status da tarefa.');
    }
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
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(tarefa.feita)}
                onChange={() => handleAlternarTarefa(tarefa.id, tarefa.feita)}
              />
              <span style={{ textDecoration: tarefa.feita ? 'line-through' : 'none' }}>
                {tarefa.texto}
              </span>
            </label>
            <button id="quartoBotao" type="button" onClick={() => handleRemoverTarefa(tarefa.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button id="quintoBotao" className="tasks-check-button" onClick={handleVerificarLimite}>
        Verificar Limite
      </button>

      {mensagem && (
        <p
          className={`tasks-message ${
            tarefas.length < 5 ? 'tasks-message-warning' : 'tasks-message-success'
          }`}
          role="status"
        >
          {mensagem}
        </p>
      )}
    </div>
  );
}