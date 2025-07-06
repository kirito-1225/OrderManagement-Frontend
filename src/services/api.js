import axios from 'axios';


export const fetchOrders = (params) => {
    // Clean up empty filter values before sending
    const cleanedParams = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && (!Array.isArray(value) || value.length > 0)) {
            acc[key] = value;
        }
        return acc;
    }, {});
    
    return axios.get('/api/orders', { params: cleanedParams });
};