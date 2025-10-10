// src/screens/cadastro/Cadastro.js
import { Link } from 'react-router-dom';
import './Register.css';

function Cadastro() {
    return (
        <div className="register-container">
            <h2>Criar Conta</h2>

            <div className='input-group'>
                <label htmlFor="name">Nome Completo</label>
                <input type="text" id="name" placeholder="Digite seu nome completo" />
            </div>

            <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="seu.email@exemplo.com" />
            </div>

            <div className='input-group'>
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Crie uma senha forte" />
            </div>

            <div className='input-group'>
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input type="password" id="confirmPassword" placeholder="Repita a senha" />
            </div>

            <button className="register-button" type='submit'>
                Cadastrar
            </button>

            <p className="login-link">
                Já tem uma conta? <Link to="/">Faça login</Link>
            </p>

        </div>
    );
}

export default Cadastro;