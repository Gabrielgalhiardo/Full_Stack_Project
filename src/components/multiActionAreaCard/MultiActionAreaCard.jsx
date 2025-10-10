import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { ClickAwayListener, Portal } from '@mui/material';

import './MultiActionAreaCard.css';

export default function MultiActionAreaCard(props) {
    const [openModalDetalhes, setOpenModalDetalhes] = React.useState(false);
    const [openModalCarrinho, setOpenModalCarrinho] = React.useState(false);

    const handleAbrirDetalhes = () => setOpenModalDetalhes(true);
    const handleAbrirCarrinho = () => setOpenModalCarrinho(true);

    const handleFecharModais = () => {
        setOpenModalDetalhes(false);
        setOpenModalCarrinho(false);
    };
    
    return (
        <ClickAwayListener onClickAway={handleFecharModais}>
            <div>
                <Card sx={{
                    maxWidth: 455,
                    backgroundColor: '#2d3237ff',
                    color: 'white',
                    height: '450px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <CardActionArea
                        onClick={handleAbrirDetalhes}
                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia component="img" height="200" image={props.product.imageUrl} alt={props.product.title} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">{props.product.title}</Typography>
                            <Typography variant="body2" sx={{ color: '#b5b5b5ff' }}>{props.product.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Typography variant="h6">R$ {props.product.price.toFixed(2).replace('.', ',')}</Typography>
                        <CardActions>
                            <Button size="small" variant="contained" color="primary" onClick={handleAbrirCarrinho}>Comprar</Button>
                        </CardActions>
                    </Box>
                </Card>

                {/* MODAL 1: Detalhes do Produto */}
                {openModalDetalhes && (
                    <Portal>
                        {/* ✅ PASSO 2: Troque a prop 'sx' por 'className' */}
                        <Box className="modal-detalhes">
                            <Typography variant="h4" component="h2">{props.product.title}</Typography>
                            {/* ✅ PASSO 3: Troque a prop 'style' por 'className' na imagem */}
                            <img src={props.product.imageUrl} alt={props.product.title} className="modal-detalhes-imagem" />
                            <Typography sx={{ mt: 2 }}>{props.product.description}</Typography>
                            <Typography variant="h5" sx={{ mt: 3 }}>
                                Preço: R$ {props.product.price.toFixed(2).replace('.', ',')}
                            </Typography>
                            <Button variant="contained" sx={{ mt: 2 }} onClick={handleFecharModais}>Fechar</Button>
                        </Box>
                    </Portal>
                )}

                {openModalCarrinho && (
                    <Portal>
                        <Box className="modal-carrinho">
                            <Typography variant="h6" component="h2">Produto Adicionado!</Typography>
                            <Typography sx={{ mt: 2 }}>
                                Você adicionou "{props.product.title}" ao seu carrinho.
                            </Typography>
                            <Button sx={{ mt: 2 }} onClick={handleFecharModais}>OK</Button>
                        </Box>
                    </Portal>
                )}
            </div>
        </ClickAwayListener>
    );
}