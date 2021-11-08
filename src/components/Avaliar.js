import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore/lite";
import { db } from "../conectadb";
import { useForm } from "react-hook-form";


const Avaliar = () => {
  const {id} = useParams();

  const [jogo, setJogo] = useState({})
  const [avaliacoes, setAvaliacoes] = useState([])
  const [aviso, setAviso] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      for(let i = 0; i < avaliacoes.length; i++) {
        if (avaliacoes[i].email === data.email) {
          alert("Jogo já avaliado com este e-mail!")   
          return       
        }
      }
        const docRef = await addDoc(collection(db, "jogos", id, "avaliacoes"), data);
        setAviso(`Ok! Avaliação cadastrada com sucesso! Código ${docRef.id}`)
        
        console.log("Document written with ID: ", docRef.id);  
    } catch (err) {
      console.log(err);
      setAviso(`Erro... ${err}`)
    }
    
    tempoAviso()
    
    setValue('nome', '')
    setValue('email', '')
    setValue('nota', '')
};

  const tempoAviso = () => {
    setTimeout(() => {
      setAviso('')
    }, 5000)
  }

  const getObra = async (id) => {
    const docRef = doc(db, "jogos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setJogo({id: docSnap.id, ...docSnap.data()})
    } else {
      console.log("Erro...");
    }    
  }

  useEffect(() => {
    getObra(id);
    getAvaliacoes(id);
  }, [id])

  const  getAvaliacoes = async (id) => {
    const avaliacaoCol = collection(db, "jogos", id, 'avaliacoes')
    const avaliacaoSnapshot = await getDocs(avaliacaoCol);
    const avaliacaoList = avaliacaoSnapshot.docs.map((doc) => {
       const dados = doc.data();
       const id = doc.id;
       return {id, ...dados};
    });
    setAvaliacoes(avaliacaoList)

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 mt-2">
          <div className="card">
            <img 
              src={jogo.capa} 
              alt="Capa" 
              className="card-img-top img-fluid"
              
            />
            <div className="card-body">
              <h4>{jogo.nome}</h4>
              <h6>Desenvovledora: {jogo.desenvolvedora}</h6>
              <p className="card-text">Valor:{" "}
                {jogo?.valor?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-8 mt-2">
          <span className="btn btn-danger btn-lg btn-block">
            AVALIE O JOGO!
          </span>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="input-group my-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                {...register("nome", {
                  required: true,
                  minLength: 3,
                })}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-at" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="E-mail"
                {...register("email", {
                  required: true,
                  minLength: 10,
                })}
              />
            </div>
            
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fas fa-star" />
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Nota 'de 1 a 5'"
                {...register("nota", {
                  required: true,
                  min: 1,
                  max: 5,
                })}
              />
            </div>

            <div className={(errors.nome || errors.email || errors.nota) &&
              "alert alert-danger mt-3"}>
                {(errors.nome || errors.email) && (
                  <span>Por favor... preencha todos os campos; </span>)}
                {(errors.nota) && (
                  <span>A nota deve ser entre 1 e 5... </span>)}
            </div>

            {aviso && (
              <div className='alert alert-success mt-3'>
                <span>{aviso}</span>
              </div>
            )}

            <Link to="/" class="btn btn-info float-left mt-3">Retornar</Link>      
            <input type="submit" value="Enviar avaliação" class="btn btn-success float-right mt-3" />

          </form>

        </div>
      </div>
    </div>
  )
}

export default Avaliar;