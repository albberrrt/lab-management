import jwt from 'jsonwebtoken'

export function generateToken(userId: string): string {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in .env file');
    }

    const payload = {
        userId: userId,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h'});

    return token;
}