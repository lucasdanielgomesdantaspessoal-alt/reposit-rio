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
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleAdicionarTarefa} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma tarefa..."
          style={{ padding: '8px', flex: 1 }}
        />
        <button id = 'terceiroBotao'
        type="submit" style={{ padding: '8px 12px' }}>
          Adicionar
        </button>
      </form>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}{' '}
            <button id = 'quartoBotao' 
            type="button" onClick={() => handleRemoverTarefa(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button id = 'quintoBotao'
        onClick={handleVerificarLimite}
        style={{
          marginTop: '16px',
          padding: '10px 16px',
          cursor: 'pointer',
          backgroundColor: '#3c1f8d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Verificar Limite
      </button>

      {mensagem && (
        <p style={{ marginTop: '12px', fontWeight: 'bold', color: tarefas.length < 5 ? 'red' : 'green' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}