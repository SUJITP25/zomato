import jwt from "jsonwebtoken"


export const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(400).json({
                message: "UnAuthorized Access",
                success: false
            })
        }
        const decode = await jwt.verify(token,process.env.jwt_secret_key)
        if (!decode) {
            return res.status(400).json({
                message: "UnAuthorized Access",
                success: false
            })
        }
        const userId = decode.userId
        req.user = userId 
        next();

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server Error",
            stack: err.stack,
            success: false,
            err: err.message
        })
    }
}