import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../conectadb";
import { collection, getDocs } from "firebase/firestore/lite";

const ItemLista = (props) => {

  const [mediaAvaliacao, setMediaAvaliacao] = useState(0)
  const [avaliacao, setAvaliacao] = useState([])

  const isDecimal = parseInt(mediaAvaliacao) !== parseFloat(mediaAvaliacao)
  
  const  getAvaliacoes = async (id) => {
    const avaliacaoCol = collection(db, "jogos", id, 'avaliacoes')
    const avaliacaoSnapshot = await getDocs(avaliacaoCol);
    const avaliacaoList = avaliacaoSnapshot.docs.map((doc) => {
       const dados = doc.data();
       const id = doc.id;
       return {id, ...dados};
    });
    setAvaliacao(avaliacaoList)
    const mediaAval = avaliacaoList.map((el) => Number(el.nota)).reduce((values, value) => values + value, 0)
    setMediaAvaliacao(mediaAval > 0 ? (mediaAval / avaliacaoList.length) : 0)
  }

  useEffect(() => {
    getAvaliacoes(props.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card" key={props.id} >
      <img className="card-img-top" src={props.capa} alt="Jogo" style={{height: "450px"}}/>
      <div className="card-body">
        <h4>{props.nome}</h4>
        <p>
          Desenvolvedora: {props.desenvolvedora}
          <br />
          Valor:{" "}
          {props.valor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p className="mb-1">Avaliação:</p>
        {mediaAvaliacao === 0 && (<p className="mb-3">Ainda não há avaliações.</p>)}
        
        {Array.from({ length: Math.trunc(mediaAvaliacao) }).map((_, index) => (
          <i className={isDecimal ? "fas fa-star" : 'fas fa-star  mb-3'} key={index}></i>
        ))}        
        {isDecimal && (
          <i className="fas fa-star-half-alt mb-3"></i>
        )}
        {mediaAvaliacao !== 0 && (<nobr>&ensp; ({avaliacao.length})</nobr>)}
        <Link to={`/avaliar/${props.id}`} className="btn btn-block btn-info">
          Avaliar
        </Link>
      </div>
    </div>
  );
};

export default ItemLista;
