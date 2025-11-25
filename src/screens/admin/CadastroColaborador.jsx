import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroColaborador.css';
import { api } from '../../services/api';
import { FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';

function CadastroColaborador() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

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
            const collaboratorData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            console.log('📋 Colaborador a ser cadastrado:', collaboratorData);

            // Endpoint para criar colaborador (ajuste conforme sua API)
            const response = await api.post('/api/collaborators', collaboratorData);
            
            console.log('✅ Colaborador cadastrado com sucesso:', response);
            
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            // Limpa mensagem de sucesso após 3 segundos
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (err) {
            console.error("❌ Erro ao cadastrar colaborador:", err);
            setError(err.message || 'Erro ao cadastrar colaborador');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-cadastro-container">
            <div className="admin-cadastro-header">
                <h1>
                    <FaUserPlus /> Cadastrar Colaborador
                </h1>
                <button 
                    className="btn-voltar" 
                    onClick={() => navigate(-1)}
                >
                    <FaTimes /> Voltar
                </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-cadastro-form">
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        ✅ Colaborador cadastrado com sucesso!
                    </div>
                )}

                <div className="form-section">
                    <label className="form-label">Nome Completo *</label>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Digite o nome completo do colaborador" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required 
                        minLength={3}
                    />
                </div>

                <div className="form-section">
                    <label className="form-label">Email *</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="colaborador@exemplo.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required 
                    />
                </div>

                <div className="form-section">
                    <label className="form-label">Senha *</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Mínimo 6 caracteres" 
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input"
                        required 
                        minLength={6}
                    />
                    <span className="form-hint">A senha deve ter no mínimo 6 caracteres</span>
                </div>

                <div className="form-section">
                    <label className="form-label">Confirmar Senha *</label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Digite a senha novamente" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input"
                        required 
                        minLength={6}
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        className="btn-cancel" 
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        <FaTimes /> Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="btn-submit" 
                        disabled={loading}
                    >
                        {loading ? (
                            <>⏳ Cadastrando...</>
                        ) : (
                            <>
                                <FaSave /> Cadastrar Colaborador
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastroColaborador;

