// Arquivo: /src/pages/Contato/ContactPage.js (ou onde preferir)

import React from 'react';
import { Box, Container, Typography, Grid, Paper, Link, IconButton } from '@mui/material';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

// Dados Fictícios (Mock)
const contactInfo = {
    address: 'Avenida casa branca, 1234 - Bela Vista, São Paulo - SP, 01310-100',
    phone: '+55 (11) 95073-9288',
    email: 'galhiardogabriel@gmail.com',
    socials: [
        { icon: <FaInstagram />, link: 'https://instagram.com' },
        { icon: <FaFacebookF />, link: 'https://facebook.com' },
        { icon: <FaLinkedinIn />, link: 'https://linkedin.com' },
        { icon: <FaTwitter />, link: 'https://twitter.com' },
    ]
};

export default function Contato() {
    return (
        <Box sx={{ backgroundColor: '#1e1e1e', color: 'white', py: 8, width: '70dvw', minHeight: '100dvh' }}>
            <Container maxWidth="lg">
                
                {/* --- TÍTULO --- */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Entre em Contato
                    </Typography>
                    <Typography variant="h5" color="#b5b5b5ff">
                        Estamos aqui para ajudar. Envie-nos uma mensagem ou nos visite!
                    </Typography>
                </Box>

                <Grid container spacing={5}>

                    {/* --- COLUNA ESQUERDA: INFORMAÇÕES DE CONTATO --- */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ backgroundColor: '#2d3237ff', color: 'white', padding: 4, height: '100%', borderRadius: '15px' }}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Nossas Informações
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                                <FaMapMarkerAlt style={{ marginRight: '16px', fontSize: '1.2rem', color: '#675d00' }} />
                                <Typography variant="body1">{contactInfo.address}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                                <FaPhoneAlt style={{ marginRight: '16px', fontSize: '1.2rem', color: '#675d00' }} />
                                <Link href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} color="inherit" underline="hover">
                                    {contactInfo.phone}
                                </Link>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                                <FaEnvelope style={{ marginRight: '16px', fontSize: '1.2rem', color: '#675d00' }} />
                                <Link href={`mailto:${contactInfo.email}`} color="inherit" underline="hover">
                                    {contactInfo.email}
                                </Link>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    Siga-nos
                                </Typography>
                                <Box>
                                    {contactInfo.socials.map((social, index) => (
                                        <Link href={social.link} target="_blank" rel="noopener" key={index}>
                                            <IconButton sx={{ 
                                                color: 'white', 
                                                backgroundColor: '#1e1e1e', 
                                                mr: 1,
                                                '&:hover': {
                                                    backgroundColor: '#675d00',
                                                }
                                            }}>
                                                {social.icon}
                                            </IconButton>
                                        </Link>
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* --- COLUNA DIREITA: MAPA --- */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden', borderRadius: '15px' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1458349286293!2d-46.65883168502446!3d-23.56291218468202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1670000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '400px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa da Localização da Empresa"
                            ></iframe>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}