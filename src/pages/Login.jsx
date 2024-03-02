import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from './Login.module.css'; // Importar o arquivo CSS

function Login() {
   // Definir estados para email e senha
   const navigate = useNavigate();
   const [usuario, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [usuarios, setUsuarios] = useState([
      { usuario: 'lucas', senha: '123' },
      { usuario: 'matheus', senha: '123' }
   ]);

   // Função para lidar com o envio do formulário
   const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui você pode adicionar lógica para autenticar o usuário
      if (usuarios.some((e) => e.usuario === usuario && e.senha === password)) {
         navigate("/catalogo");
      } else {
         console.error('Usuário ou senha incorretos');
      }
      // Limpar os campos após o envio do formulário
      setEmail('');
      setPassword('');
   };

   return (
      <div id={style.loginContainer}>
         <h2>Login</h2>
         <form onSubmit={handleSubmit}>
            <div className={style.formGroup}>
               <label htmlFor="usuario">Usuário:</label>
               <input
                  type='text'
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div className={style.formGroup}>
               <label htmlFor="password">Senha:</label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Entrar</button>
         </form>
      </div>
   );
}

export default Login;