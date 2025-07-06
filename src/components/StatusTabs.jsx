import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

export default function StatusTabs({ activeTab, setActiveTab }) {
    const tabs = ['All Orders', 'Completed', 'Continuing', 'Restitute', 'Canceled'];

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleChange} aria-label="Order status tabs">
                {tabs.map(t => (
                    <Tab key={t} label={t} value={t} />
                ))}
            </Tabs>
        </Box>
    );
}