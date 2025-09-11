

const authorizeRole = (...allowedRoles) => {
    return (req,res,next) => {
        if (!allowedRoles.includes(req.role)) {
            return res.status(401).json({message: 'Access Denied'})
        }
        next();
    }
}

module.exports = {authorizeRole};