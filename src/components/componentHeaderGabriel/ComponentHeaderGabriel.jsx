import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import './ComponentHeaderGabriel.css';
import { isAuthenticated, removeToken, isAdmin, hasAnyRole } from '../../services/authService';

function ComponentHeaderGabriel() {
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const admin = isAdmin();
    const canAccessProfile = hasAnyRole('COLLABORATOR', 'ADMIN');

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login', { replace: true });
        fecharMenu();
    };

    return (
        <header className="header-container">
            <div className="logo">
                <Link to={authenticated ? "/home" : "/login"} onClick={fecharMenu}>
                    <img src="/img/logo.png" alt="Logo" className='imagem-logo' />
                </Link>
            </div>

            {/* Agrupador para a navegação e ações para melhor controle no mobile */}
            <div className="header-direita">
                {authenticated ? (
                    <>
                        <nav className={`nav-menu ${menuAberto ? 'ativo' : ''}`}>
                            <ul>
                                <li>
                                    <NavLink to="/home" onClick={fecharMenu}>Início</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sobre" onClick={fecharMenu}>Sobre</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contato" onClick={fecharMenu}>Contato</NavLink>
                                </li>
                                {canAccessProfile && (
                                    <li>
                                        <NavLink to="/perfil" onClick={fecharMenu}>Perfil</NavLink>
                                    </li>
                                )}
                                {admin && (
                                    <>
                                        <li>
                                            <NavLink to="/admin/colaboradores" onClick={fecharMenu}>Colaboradores</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/admin/cadastro-colaborador" onClick={fecharMenu}>Cadastrar Colaborador</NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>

                        <div className="header-actions">
                            <Link to="/carrinho" className="cart-link" onClick={fecharMenu}>
                                <FaShoppingCart />
                                <span className="cart-badge">3</span>
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="logout-button"
                                title="Sair"
                            >
                                <FaSignOutAlt />
                            </button>
                        </div>
                    </>
                ) : (
                    <nav className={`nav-menu ${menuAberto ? 'ativo' : ''}`}>
                        <ul>
                            <li>
                                <NavLink to="/login" onClick={fecharMenu}>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/cadastro" onClick={fecharMenu}>Cadastro</NavLink>
                            </li>
                        </ul>
                    </nav>
                )}

                <button
                    className={`hamburger ${menuAberto ? 'ativo' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Abrir menu"
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>
        </header>
    );
}

export default ComponentHeaderGabriel;