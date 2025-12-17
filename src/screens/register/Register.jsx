// src/screens/register/Register.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { isAuthenticated } from '../../services/authService';
import { api } from '../../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Redireciona para /home se já estiver autenticado
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validações
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem!');
            return;
        }

        if (formData.password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres!');
            return;
        }

        setLoading(true);

        try {
            // Dados conforme CustomerRequestDTO do backend
            const customerData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            console.log('📋 Customer a ser cadastrado:', customerData);

            // Endpoint de registro de customers
            const response = await api.post('/api/customers', customerData);
            
            console.log('✅ Customer cadastrado com sucesso:', response);
            
            // Redireciona para login após cadastro bem-sucedido
            navigate('/login', { 
                replace: true,
                state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' }
            });

        } catch (err) {
            console.error("❌ Erro ao cadastrar customer:", err);
            
            // Mensagens de erro mais específicas baseadas no tipo de erro
            let errorMessage = 'Erro ao cadastrar. Verifique os dados e tente novamente.';
            
            if (err.message) {
                if (err.message.includes('400') || err.message.includes('inválido') || err.message.includes('já em uso')) {
                    errorMessage = 'Dados inválidos ou e-mail já cadastrado. Verifique e tente novamente.';
                } else if (err.message.includes('401')) {
                    errorMessage = 'Não autenticado. Faça login primeiro.';
                } else if (err.message.includes('403')) {
                    errorMessage = 'Acesso negado. Você não tem permissão para criar clientes.';
                } else {
                    errorMessage = err.message;
                }
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page-wrapper">
            <div className="register-container">
                <h2>Criar Conta</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor="name">Nome Completo</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Digite seu nome completo" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={3}
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="seu.email@exemplo.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="password">Senha</label>
                    <div className="password-input-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            name="password"
                            placeholder="Crie uma senha forte (mín. 6 caracteres)" 
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className='input-group'>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <div className="password-input-wrapper">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            id="confirmPassword" 
                            name="confirmPassword"
                            placeholder="Repita a senha" 
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <button 
                    className="register-button" 
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>

                <p className="login-link">
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;