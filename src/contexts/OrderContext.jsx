import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        // Carrega do localStorage se existir
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Salva no localStorage sempre que os pedidos mudarem
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const createOrder = (cartItems, total) => {
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                collaboratorId: item.collaboratorId || null,
                collaboratorName: item.collaboratorName || null
            })),
            total: total,
            status: 'Pendente'
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);
        return newOrder;
    };

    const getSalesByCollaborator = (collaboratorId) => {
        // Filtra todos os pedidos para encontrar itens vendidos por este colaborador
        const sales = [];
        orders.forEach(order => {
            order.items.forEach(item => {
                if (item.collaboratorId === collaboratorId) {
                    sales.push({
                        orderId: order.id,
                        orderDate: order.date,
                        orderStatus: order.status,
                        productId: item.id,
                        productTitle: item.title,
                        productImage: item.imageUrl,
                        quantity: item.quantity,
                        unitPrice: item.price,
                        totalPrice: item.price * item.quantity
                    });
                }
            });
        });
        return sales;
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                createOrder,
                getOrderById,
                updateOrderStatus,
                getSalesByCollaborator
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

