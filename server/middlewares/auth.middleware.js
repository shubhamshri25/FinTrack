import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        // Extracting the token from the authorization header
        const token =
            req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "No token provided, authorization denied" });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the decoded token
        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Invalid token, authorization denied" });
    }
};

export default authMiddleware;
