// src/screens/login/Login.js

import { Link } from 'react-router-dom'; // 1. IMPORTE O LINK AQUI
import './Login.css';

function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>

            <div className='input-group'>
                <label htmlFor="username">Usuário</label>
                <input type="text" id="username" placeholder="Usuário" />
            </div>

            <div className='input-group'>
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Senha" />
            </div>

            <button
                className="login-button"
                type='submit'
            >
                Entrar
            </button>

            {/* 2. ADICIONE ESTE TRECHO ABAIXO */}
            <p className="register-link">
                Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
            
        </div>
    );
}

export default Login;