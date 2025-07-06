import React from 'react';
import {
    Table, TableHead, TableBody, TableCell, TableRow, TablePagination,
    Chip, Box, CircularProgress, Typography, TableContainer
} from '@mui/material';

export default function OrderTable({ data, page, size, total, onPageChange, loading }) {
    
    const getStatusChipColor = (status) => {
        // Add a check for status existence
        if (!status) return 'default';
        switch (status.toLowerCase()) {
            case 'completed': return 'success';
            case 'continuing': return 'primary';
            case 'restitute': return 'warning';
            case 'canceled': return 'error';
            default: return 'default';
        }
    };

    const columns = ["Order ID", "Customer", "Order Item", "Delivery Date", "Delivery Pricing", "Status"];

    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(col => <TableCell key={col} sx={{ fontWeight: 'bold' }}>{col}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : data && data.length > 0 ? (
                            data.map((row) => (
                                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.orderId}</TableCell>
                                    <TableCell>{row.customer}</TableCell>
                                    <TableCell>{row.orderItem}</TableCell>
                                    <TableCell>{row.deliveryDate}</TableCell>
                                    <TableCell>${row.deliveryPricing ? row.deliveryPricing.toFixed(2) : '0.00'}</TableCell>
                                    <TableCell>
                                        <Chip label={row.status} color={getStatusChipColor(row.status)} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                    <Typography>No orders found.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[size]}
                component="div"
                count={total}
                rowsPerPage={size}
                page={page}
                onPageChange={onPageChange}
            />
        </Box>
    );
}