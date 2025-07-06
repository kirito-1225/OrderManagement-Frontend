import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import StatusTabs from './components/StatusTabs';
import Filters from './components/Filters';
import OrderTable from './components/OrderTable';
import { fetchOrders } from './services/api';

export default function App() {
    const [activeTab, setActiveTab] = useState('All Orders');
    const [filters, setFilters] = useState({
        orderId: '',
        customer: '',
        orderItem: '',
        from: '',
        to: '',
        minPrice: '',
        maxPrice: '',
        status: [],
    });
    const [page, setPage] = useState(0);
    const [ordersData, setOrdersData] = useState({ content: [], totalElements: 0 });
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false); // State for filter visibility
    
    const size = 10; // Items per page

    const filtersString = JSON.stringify(filters);

    const loadOrders = useCallback(() => {
        setLoading(true);
        let statusFilter = [];
        if (activeTab !== 'All Orders') {
            statusFilter = [activeTab];
        } else if (filters.status.length > 0) {
            statusFilter = filters.status;
        }

        const params = { ...filters, status: statusFilter, page, size };

        fetchOrders(params)
            .then(response => {
                if(response.data && Array.isArray(response.data.content)) {
                    setOrdersData(response.data);
                } else {
                    console.error("Unexpected response structure:", response.data);
                    setOrdersData({ content: [], totalElements: 0 });
                }
            })
            .catch(error => {
                console.error("Failed to fetch orders:", error);
                setOrdersData({ content: [], totalElements: 0 });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [activeTab, page, filtersString, size]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    useEffect(() => {
        setPage(0);
    }, [filtersString, activeTab]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Order Details
                    </Typography>
                    <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <Filters 
                        open={filtersOpen}
                        onToggle={() => setFiltersOpen(!filtersOpen)}
                        filters={filters} 
                        setFilters={setFilters} 
                    />
                </Box>
                <OrderTable
                    data={ordersData.content}
                    page={page}
                    size={size}
                    total={ordersData.totalElements}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    loading={loading}
                />
            </Paper>
        </Container>
    );
}