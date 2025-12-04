export const VALIDATION = { 
    MIN_YEAR: 1886, 
    MAX_YEAR: new Date().getFullYear() + 1, 
    MIN_MILEAGE: 0, 
    MIN_PRICE: 0 
}; 
export const RIGHTS = { USER: 0, ADMIN: 1 }; 
export const RATE_LIMITS = { 
    AUTH: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 3 }, 
    GLOBAL: { WINDOW_MS: 15 * 60 * 1000, MAX_REQUESTS: 100 } 
};