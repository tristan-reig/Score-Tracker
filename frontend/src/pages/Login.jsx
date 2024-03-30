import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [signIn, toggle] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/register", { name, email, password })
    .then(result => {
      console.log(result)
      navigate("/login")
      alert("Votre compte a été crée")
    })
    .catch(err => console.log(err))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/login", { email, password })
    .then(result => {
      console.log(result)
      if(result.data === "Success"){
        navigate("/")
        localStorage.setItem('logged', true);
      }else{
        navigate("/login")
        alert("Vos identifiants sont incorrects")
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="bg-gray-900 min-h-[600px] relative overflow-hidden p-auto">
      <div className={`absolute top-0 h-full left-0 w-1/2 opacity-0 z-1 ${signIn !== true ? 'translate-x-full opacity-100 z-5' : null}`} style={{transition: "all 0.6s ease-in-out"}}>
        <form className="bg-gray-700 flex items-center justify-center flex-col px-20 h-full text-center" onSubmit={handleRegisterSubmit}>
          <h1 className="font-bold my-4 text-xl text-white">Créer un compte</h1>
          <input className="bg-[#eee] border-b bg-gray-700 px-3 py-2.5 my-2 w-2/3 focus:outline-none" type="text" placeholder="Nom" onChange={(e) => setName(e.target.value)} />
          <input className="bg-[#eee] border-b bg-gray-700 px-3 py-2.5 my-2 w-2/3 focus:outline-none" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input className="bg-[#eee] border-b bg-gray-700 px-3 py-2.5 my-2 w-2/3 focus:outline-none mb-10" type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
          <button className="btn btn-primary w-2/3">S'inscrire</button>
        </form>
      </div>
      <div className={`absolute top-0 h-full left-0 w-1/2 z-2 ${signIn !== true ? `translate-x-full` : null}`} style={{transition: "all 0.6s ease-in-out"}}>
        <form className="bg-gray-700 flex items-center justify-center flex-col px-[50px] h-full text-center" onSubmit={handleLoginSubmit}>
          <h1 className="font-bold my-4 text-xl text-white">Se connecter</h1>
          <input className="bg-[#eee] border-b bg-gray-700 px-3 py-2.5 my-2 w-2/3 focus:outline-none" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input className="bg-[#eee] border-b bg-gray-700 px-3 py-2.5 my-2 w-2/3 focus:outline-none mb-10" type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
          <a className="my-[15px] text-sm hover:underline flex mb-6" href="#">Mot de passe oublié ?</a>
          <button className="btn btn-primary w-2/3">Se connecter</button>
        </form>
      </div>
      <div className={`absolute top-0 left-[50%] w-1/2 h-full overflow-hidden ${signIn !== true ? "-translate-x-full" : null}`} style={{transition: "transform 0.6s ease-in-out", zIndex: 100}}>
        <div className={`text-white relative -left-[100%] h-full w-[200%] translate-x-0 ${signIn !== true ? "translate-x-1/2" : null}`} style={{transform: "transform 0.6s ease-in-out"}}>
          <div className={`bg-red-500 absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 -translate-x-[20%] ${signIn !== true ? `translate-x-0` : null}`} style={{transition: "all 0.6s ease-in-out"}}>
            <p className="font-medium font-thin leading-5 mt-6 my-8">
              Déjà inscrit ?
            </p>
            <button className="btn w-2/3 rounded-full text-white bg-transparent" onClick={() => toggle(true)}>
              Se connecter
            </button>
          </div>
          <div className={`bg-red-500 absolute flex items-center justify-center flex-col px-[40px] text-center top-0 h-[100%] w-1/2 right-0 ${signIn !== true ? `translate-x-0` : null}`} style={{transition: "all 0.6s ease-in-out"}}>
            <p className="font-medium font-thin leading-5 mt-6 my-8">
              Vous n'avez pas de compte ?
            </p>
            <button className="btn bg-transparent w-2/3 rounded-full text-white" onClick={() => toggle(false)}>
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login