import { decodeToken } from "../utils/token.utils.js";
import Users from "../data/data.js";

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthenticated"
        })
    }

    const decoded = decodeToken(token);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthenticated"
        })
    }


    const user = Users.get(decoded.id);
    if (!user || user.email !== decoded.email) {
        return res.status(401).json({
            success: false,
            message: "Unauthenticated"
        })
    }


    req.user = Users.get(decoded.id);
    next();
}


export default authenticateUser;