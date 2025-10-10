import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // 1. IMPORTAR O ÍCONE
import './ComponentHeaderGabriel.css';

function ComponentHeaderGabriel() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/home" onClick={fecharMenu}>
                    <img src="/img/logo.png" alt="Logo" className='imagem-logo' />
                </Link>
            </div>

            {/* Agrupador para a navegação e ações para melhor controle no mobile */}
            <div className="header-direita">
                <nav className={`nav-menu ${menuAberto ? 'ativo' : ''}`}>
                    <ul>
                        <li>
                            <NavLink to="/" onClick={fecharMenu}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" onClick={fecharMenu}>Início</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sobre" onClick={fecharMenu}>Sobre</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contato" onClick={fecharMenu}>Contato</NavLink>
                        </li>
                         <li>
                            <NavLink to="/perfil" onClick={fecharMenu}>Perfil</NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <Link to="/carrinho" className="cart-link" onClick={fecharMenu}>
                        <FaShoppingCart />
                        <span className="cart-badge">3</span>
                    </Link>
                </div>

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