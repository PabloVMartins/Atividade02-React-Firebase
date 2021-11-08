import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../conectadb";
import ItemLista from "./ItemLista";

const ListaJogos = () => {

  const [Jogos, setJogos] = useState([])

  // Get a list of cities from your database
  const getJogos = async () => {
    const jogosCol = collection(db, "jogos");
    const jogoSnapshot = await getDocs(jogosCol);
    const jogoList = jogoSnapshot.docs.map((doc) => {
       const dados = doc.data();
       const id = doc.id;
       return {id, ...dados};
    });
    setJogos(jogoList);
  };

  useEffect(() => {
    getJogos();
  }, []);

  return (
    <div className="container mt-2">
      <div className="card-columns">
        {Jogos.map(jogo => (
          <ItemLista 
            id={jogo.id}          
            nome={jogo.nome}          
            desenvolvedora={jogo.desenvolvedora}          
            valor={jogo.valor}          
            capa={jogo.capa} />         
        ))}
      </div>
    </div>
  );
};

export default ListaJogos;
