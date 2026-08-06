// Generate a fake JWT token
export function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        exp: Date.now() + 60 * 60 * 1000 // 1 hour expiry
    };

    return btoa(JSON.stringify(payload));
}

// Decode the token
export function decodeToken(token) {
    try {
        return JSON.parse(atob(token));
    } catch (error) {
        return null;
    }
}

// Check if token has expired
export function isTokenExpired(token) {
    const data = decodeToken(token);

    if (!data) return true;

    return Date.now() > data.exp;
}