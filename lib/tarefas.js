import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, tarefasCollection, ouvirTarefas } from "./firebase.js";

const colecao = tarefasCollection;
export { ouvirTarefas };
export async function criarTarefa(texto) {
  try {
    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      throw new Error("Texto da tarefa não pode estar vazio.");
    }
    const docRef = await addDoc(colecao, {
      texto: textoLimpo,
      feita: false,
      criadaEm: serverTimestamp(),
    });
    console.log("Tarefa criada com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao criar tarefa: ", e);
    throw e;
  }
}
export async function alternarTarefa(id, feita) {
  await updateDoc(doc(db, "tarefas", id), {
    feita: !feita,
  });
}
export async function removerTarefa(id) {
  await deleteDoc(doc(db, "tarefas", id));
}
