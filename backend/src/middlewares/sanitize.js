export function sanitizeInputs(req, res, next) {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                // Skip password fields
                if (key.toLowerCase().includes('password')) {
                    return;
                }
                req.body[key] = req.body[key].trim();
            }
        });
    }
    next();
}