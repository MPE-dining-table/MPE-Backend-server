import Users from "../models/userModel.js"
export const authorizeRole = (requiredRole) => {
    return async (req, res, next) => {
      try {
        const user = await Users.findById(req.user._id); 
        
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        if (user.role !== requiredRole) {
          return res.status(403).json({ error: "Access denied" });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ error: "Authorization error" });
      }
    };
  };