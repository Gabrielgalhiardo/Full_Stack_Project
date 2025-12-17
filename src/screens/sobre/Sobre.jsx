import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaAward, FaHeart, FaShoppingBag, FaHeadset, FaShieldAlt, FaTruck } from 'react-icons/fa';
import './Sobre.css';

const equipe = [
    {
        name: 'Gabriel Galhiardo Farina',
        role: 'Líder & Desenvolvedor Full-Stack',
        avatarUrl: '/img/fotoRosto.jpg'
    },
];

const valores = [
    {
        icon: <FaRocket />,
        title: 'Inovação',
        description: 'Sempre buscando as melhores tecnologias e soluções para nossos clientes.'
    },
    {
        icon: <FaUsers />,
        title: 'Compromisso',
        description: 'Dedicados a entregar produtos de qualidade e excelência em cada projeto.'
    },
    {
        icon: <FaAward />,
        title: 'Qualidade',
        description: 'Rigoroso controle de qualidade em todos os nossos produtos e serviços.'
    },
    {
        icon: <FaHeart />,
        title: 'Paixão',
        description: 'Fazemos o que amamos e isso se reflete em cada detalhe do nosso trabalho.'
    }
];

const beneficios = [
    {
        icon: <FaShoppingBag />,
        title: 'Produtos Diversificados',
        description: 'Ampla variedade de categorias para atender todas as suas necessidades.'
    },
    {
        icon: <FaHeadset />,
        title: 'Suporte Dedicado',
        description: 'Equipe pronta para ajudar você em todas as etapas da sua compra.'
    },
    {
        icon: <FaShieldAlt />,
        title: 'Compra Segura',
        description: 'Seus dados e transações protegidos com os mais altos padrões de segurança.'
    },
    {
        icon: <FaTruck />,
        title: 'Entrega Rápida',
        description: 'Envio ágil para todo o Brasil, com rastreamento em tempo real.'
    }
];

function Sobre() {
    return (
        <div className="sobre-container">
            <div className="sobre-content">

                {/* --- SEÇÃO HERO --- */}
                <div className="sobre-hero">
                    <h2 className="sobre-hero-title">
                        Nossa Missão é Transformar Ideias em Realidade
                    </h2>
                    <p className="sobre-hero-text">
                        Desde 2025, trabalhamos para oferecer não apenas produtos, mas soluções que inspiram e facilitam a vida de nossos clientes em todo o Brasil.
                    </p>
                </div>

                {/* --- SEÇÃO NOSSA HISTÓRIA --- */}
                <div className="sobre-historia">
                    <div className="sobre-historia-content">
                        <div className="sobre-historia-text-wrapper">
                            <h2 className="sobre-historia-title">
                                Nossa História
                            </h2>
                            <p className="sobre-historia-text">
                                Tudo começou com um pequeno sonho em uma garagem, alimentado por uma paixão por tecnologia e design. Com muito trabalho e dedicação, crescemos e nos tornamos uma referência no mercado, sempre mantendo o foco em nossa essência: inovar com propósito e atender com excelência.
                            </p>
                            <p className="sobre-historia-text">
                                Acreditamos que cada produto que vendemos é um passo em direção a um futuro mais conectado e funcional. Nossa jornada é marcada pela busca constante da excelência e pelo compromisso com a satisfação de nossos clientes.
                            </p>
                        </div>
                        <div className="sobre-historia-image-wrapper">
                            <img
                                src="/img/escritorio.jpg"
                                alt="Nosso escritório"
                                className="sobre-historia-image"
                                draggable="false"
                                onDragStart={(e) => e.preventDefault()}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>
                </div>

                {/* --- SEÇÃO VALORES --- */}
                <div className="sobre-valores">
                    <h2 className="sobre-valores-title">
                        Nossos Valores
                    </h2>
                    <div className="sobre-valores-grid">
                        {valores.map((valor, index) => (
                            <div key={index} className="sobre-valor-card-wrapper">
                                <div className="sobre-valor-card">
                                    <div className="sobre-valor-icon">
                                        {valor.icon}
                                    </div>
                                    <h3 className="sobre-valor-title">
                                        {valor.title}
                                    </h3>
                                    <p className="sobre-valor-description">
                                        {valor.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SEÇÃO BENEFÍCIOS --- */}
                <div className="sobre-beneficios">
                    <h2 className="sobre-beneficios-title">
                        Por Que Escolher a Gente?
                    </h2>
                    <div className="sobre-beneficios-grid">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="sobre-beneficio-card-wrapper">
                                <div className="sobre-beneficio-card">
                                    <div className="sobre-beneficio-icon">
                                        {beneficio.icon}
                                    </div>
                                    <h3 className="sobre-beneficio-title">
                                        {beneficio.title}
                                    </h3>
                                    <p className="sobre-beneficio-description">
                                        {beneficio.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SEÇÃO EQUIPE --- */}
                <div className="sobre-equipe">
                    <h2 className="sobre-equipe-title">
                        Conheça a Equipe
                    </h2>
                    <p className="sobre-equipe-subtitle">
                        Profissionais apaixonados por tecnologia e comprometidos com a excelência
                    </p>
                    <div className="sobre-equipe-grid">
                        {equipe.map((membro) => (
                            <div key={membro.name} className="sobre-equipe-member-wrapper">
                                <div className="sobre-equipe-member">
                                    <img
                                        src={membro.avatarUrl}
                                        alt={membro.name}
                                        className="sobre-equipe-avatar"
                                    />
                                    <h3 className="sobre-equipe-name">
                                        {membro.name}
                                    </h3>
                                    <p className="sobre-equipe-role">
                                        {membro.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SEÇÃO CALL TO ACTION (CTA) --- */}
                <div className="sobre-cta">
                    <h2 className="sobre-cta-title">
                        Gostou da nossa história?
                    </h2>
                    <p className="sobre-cta-text">
                        Veja como nossos valores se traduzem em produtos incríveis. Explore nossa loja e descubra o que temos de melhor para você!
                    </p>
                    <Link to="/home" className="sobre-cta-button">
                        Explorar Produtos
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Sobre;