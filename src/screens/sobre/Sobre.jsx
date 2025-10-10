import React from 'react';
import { Container, Box, Typography, Grid, Avatar, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const equipe = [
    {
        name: 'Gabriel Galhiardo Farina',
        role: 'Líder & Desenvolvedor Full-Stack',
        avatarUrl: 'https://picsum.photos/200"'
    },
];


function Sobre() {
    return (
        <Box sx={{ backgroundColor: '#1e1e1e', color: 'white', py: 5, width: '70dvw', minHeight: '100dvh' }}>
            <Container maxWidth="lg">

                {/* --- SEÇÃO HERO --- */}
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Nossa Missão é Transformar Ideias em Realidade
                    </Typography>
                    <Typography variant="h6" color="#b5b5b5ff" sx={{ maxWidth: '750px', margin: 'auto' }}>
                        Desde 2025, trabalhamos para oferecer não apenas produtos, mas soluções que inspiram e facilitam a vida de nossos clientes em todo o Brasil.
                    </Typography>
                </Box>

                {/* --- SEÇÃO NOSSA HISTÓRIA --- */}
                <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: '600' }}>
                            Nossa História
                        </Typography>
                        <Typography variant="body1" color="#b5b5b5ff" sx={{ lineHeight: 1.8 }}>
                            Tudo começou com um pequeno sonho em uma garagem, alimentado por uma paixão por tecnologia e design. Com muito trabalho e dedicação, crescemos e nos tornamos uma referência no mercado, sempre mantendo o foco em nossa essência: inovar com propósito e atender com excelência. Acreditamos que cada produto que vendemos é um passo em direção a um futuro mais conectado e funcional.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="/img/escritorio.jpg"
                            alt="Nosso escritório"
                            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: '600' }}>
                        Conheça a Equipe
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {equipe.map((membro) => (
                            <Grid item xs={12} sm={6} md={3} key={membro.name}>
                                <Avatar
                                    alt={membro.name}
                                    src={membro.avatarUrl}
                                    sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
                                />
                                <Typography variant="h6">{membro.name}</Typography>
                                <Typography color="#675d00">{membro.role}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* --- SEÇÃO CALL TO ACTION (CTA) --- */}
                <Paper sx={{ p: 5, textAlign: 'center', backgroundColor: '#2d3237ff', color: 'white', rounded: 22, boxShadow: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: '500' }}>
                        Gostou da nossa história?
                    </Typography>
                    <Typography color="#b5b5b5ff" sx={{ mb: 3 }}>
                        Veja como nossos valores se traduzem em produtos incríveis.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/home"
                    >
                        Explorar Produtos
                    </Button>
                </Paper>

            </Container>
        </Box>
    );
}

export default Sobre;