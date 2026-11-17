import {  addDoc,  collection,  onSnapshot,  orderBy,  query,  serverTimestamp,} from "firebase/firestore";
import { db } from "./firebase";

export const contatosCollection = collection(db, "contatos");

export function salvarContato(contato) {
  return addDoc(contatosCollection, {
    ...contato,
    criadaEm: serverTimestamp(),
  });
}

export function ouvirContatos(aoMudar) {
  const q = query(contatosCollection, orderBy("criadaEm"));

  return onSnapshot(q, (resultado) => {
    const lista = resultado.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    aoMudar(lista);
  });
}
