// Arquivo: /src/pages/Carrinho/ShoppingCartPage.js (ou onde preferir)

import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, IconButton, Divider } from '@mui/material';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom'; // Para o link de "Continuar comprando"

// --- DADOS FICTÍCIOS (MOCK) ---
// Em uma aplicação real, estes dados viriam de um Context, Redux, ou estado global.
const mockItems = [
    {
        id: 1,
        title: "Smartphone X Pro",
        price: 4999.99,
        imageUrl: "https://picsum.photos/200/?1",
        quantity: 1,
    },
    {
        id: 2,
        title: "A Sutil Arte de Ligar o F*da-se",
        price: 34.90,
        imageUrl: "https://picsum.photos/200/?2",
        quantity: 2,
    },
];
// ------------------------------------

export default function Carrinho() {
    const [cartItems, setCartItems] = useState(mockItems);

    // Função para remover um item do carrinho
    const handleRemoveItem = (itemId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
    };

    // Calcula o total usando useMemo para otimização
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    // Se o carrinho estiver vazio
    if (cartItems.length === 0) {
        return (
            <Box sx={{ backgroundColor: '#1e1e1e', color: 'white', py: 8, textAlign: 'center', minHeight: 'calc(100vh - 70px)', width: '70dvw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="sm">
                    <FaShoppingCart style={{ fontSize: '4rem', color: '#675d00' }} />
                    <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
                        Seu carrinho está vazio
                    </Typography>
                    <Typography color="#b5b5b5ff" sx={{ mb: 4 }}>
                        Adicione produtos para vê-los aqui.
                    </Typography>
                    <Button component={RouterLink} to="/home" variant="contained" color="primary">
                        Continuar Comprando
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#1e1e1e', color: 'white', py: 2, minHeight: 'calc(100vh - 70px)', width: '70dvw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    Meu Carrinho
                </Typography>

                <Grid container spacing={4}>
                    {/* --- COLUNA ESQUERDA: ITENS DO CARRINHO --- */}
                    <Grid item xs={12} md={8}>
                        {cartItems.map((item) => (
                            <Paper key={item.id} elevation={2} sx={{ backgroundColor: '#2d3237ff', color: 'white', p: 2, mb: 2, display: 'flex', alignItems: 'center', borderRadius: '15px' }}>
                                <Box component="img" src={item.imageUrl} alt={item.title} sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '10px', mr: 2 }} />
                                
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography color="#b5b5b5ff">Quantidade: {item.quantity}</Typography>
                                </Box>
                                
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</Typography>
                                    <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ color: '#b5b5b5ff', '&:hover': { color: '#e63946' } }}>
                                        <FaTrash />
                                    </IconButton>
                                </Box>
                            </Paper>
                        ))}
                    </Grid>

                    {/* --- COLUNA DIREITA: RESUMO DO PEDIDO --- */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ backgroundColor: '#2d3237ff', color: 'white', padding: 3, borderRadius: '15px', position: 'sticky', top: '100px' /* Header height + margin */ }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Resumo do Pedido
                            </Typography>
                            <Divider sx={{ my: 2, borderColor: '#444' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="#b5b5b5ff">Subtotal ({cartItems.length} itens)</Typography>
                                <Typography>R$ {total.toFixed(2).replace('.', ',')}</Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="#b5b5b5ff">Frete</Typography>
                                <Typography>GRÁTIS</Typography>
                            </Box>

                            <Divider sx={{ my: 2, borderColor: '#444' }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>R$ {total.toFixed(2).replace('.', ',')}</Typography>
                            </Box>

                            <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                size="large"
                                onClick={() => alert('Indo para o pagamento!')}
                            >
                                Finalizar Compra
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}