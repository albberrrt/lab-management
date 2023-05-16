import jwt from 'jsonwebtoken'

export function generateToken(userId: string): string {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in .env file');
    }

    const token = jwt.sign({}, jwtSecret, {
        subject: userId,
        expiresIn: '20s'
    });

    return token;
}