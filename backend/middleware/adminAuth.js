const adminAuth = (req, res, next) => {
    const adminToken = req.headers["authorization"]; // Expecting "Bearer <token>"

    const validToken = "admin-secret-token"; 
  
    if (adminToken && adminToken === `Bearer ${validToken}`) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized: Admin access only" });
    }
  };
  
module.exports = adminAuth;