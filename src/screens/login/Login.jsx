
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { api } from '../../services/api';
import { saveToken, isAuthenticated } from '../../services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Redireciona para /home se já estiver autenticado
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Faz a requisição para o endpoint de login
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });

            // Salva o token JWT recebido (suporta diferentes formatos de resposta)
            const token = response.token || response.accessToken || response.access_token || response;
            
            if (token && typeof token === 'string') {
                saveToken(token);
                // Redireciona para a página home após login bem-sucedido
                navigate('/home');
            } else {
                setError('Token não recebido do servidor.');
            }
        } catch (err) {
            setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
            console.error('Erro no login:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-container">
                <h2>Login</h2>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="seu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="password">Senha</label>
                    <div className="password-input-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <button
                    className="login-button"
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <p className="register-link">
                Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
            
            </div>
        </div>
    );
}

export default Login;