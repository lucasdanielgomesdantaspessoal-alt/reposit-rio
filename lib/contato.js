import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, contatosCollection, contatoEscrever } from "./firebase.js";

const colecao = contatosCollection;

export { contatoEscrever };
export async function criarContato(dados) {
  try {
    const docRef = await addDoc(colecao, {
      ...dados,
      criadaEm: serverTimestamp(),
    });
    console.log("Contato criado com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao criar contato: ", e);
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
