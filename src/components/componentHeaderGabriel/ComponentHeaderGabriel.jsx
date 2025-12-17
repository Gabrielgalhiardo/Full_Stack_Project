import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import './ComponentHeaderGabriel.css';
import { isAuthenticated, removeToken, isAdmin, hasAnyRole } from '../../services/authService';
import { useCart } from '../../contexts/CartContext';

function ComponentHeaderGabriel() {
    const [menuAberto, setMenuAberto] = useState(false);
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const admin = isAdmin();
    const canAccessProfile = hasAnyRole('COLLABORATOR', 'ADMIN');
    
    // Obtém a quantidade de itens no carrinho
    const { totalItems } = useCart();

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
                    <img src="/img/logo.svg" alt="Logo" className='imagem-logo' draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
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
                                    <NavLink to="/carrinho" onClick={fecharMenu}>
                                        Compras
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pedidos" onClick={fecharMenu}>Pedidos</NavLink>
                                </li>
                                {canAccessProfile && (
                                    <>
                                        <li>
                                            <NavLink to="/perfil" onClick={fecharMenu}>Perfil</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/vendas" onClick={fecharMenu}>Vendas</NavLink>
                                        </li>
                                    </>
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
                                {totalItems > 0 && (
                                    <span className="cart-badge">{totalItems}</span>
                                )}
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="logout-button"
                                title="Sair"
                            >
                                <FaSignOutAlt />
                            </button>
                            {menuAberto && (
                                <button 
                                    className="header-menu-close" 
                                    onClick={fecharMenu} 
                                    aria-label="Fechar menu"
                                >
                                    <FaTimes />
                                </button>
                            )}
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