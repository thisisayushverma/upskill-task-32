import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    const token = jwt.sign({ id: user.id,email:user.email }, process.env.JWT_SECRET);
    return token;
};


export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}