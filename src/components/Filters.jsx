import React from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button, Collapse, Grid, Chip } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';

export default function Filters({ open, onToggle, filters, setFilters }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const handleStatusChange = (event) => {
        const {
          target: { value },
        } = event;
        setFilters(prev => ({ ...prev, status: typeof value === 'string' ? value.split(',') : value, }));
    };

    const statusOptions = ['Completed', 'Continuing', 'Restitute', 'Canceled'];

    return (
        <Box sx={{ mb: 2 }}>
            <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={onToggle}
                sx={{ mb: 2 }}
            >
                Filters
            </Button>
            <Collapse in={open}>
                <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: 'grey.50' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Order ID" name="orderId" value={filters.orderId} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Customer" name="customer" value={filters.customer} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth label="Order Item" name="orderItem" value={filters.orderItem} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="From Date" name="from" type="date" InputLabelProps={{ shrink: true }} value={filters.from} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="To Date" name="to" type="date" InputLabelProps={{ shrink: true }} value={filters.to} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Min Price" name="minPrice" type="number" value={filters.minPrice} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Max Price" name="maxPrice" type="number" value={filters.maxPrice} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="status-multi-select-label">Status</InputLabel>
                                <Select
                                    labelId="status-multi-select-label"
                                    multiple
                                    name="status"
                                    value={filters.status}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => <Chip key={value} label={value} />)}
                                        </Box>
                                    )}
                                >
                                    {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </Box>
    );
}