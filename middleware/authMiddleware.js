const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ msg: "Acceso denegado. No hay token." });

    const token = authHeader.split(" ")[1]; // Separa "Bearer" del "TOKEN"
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token no válido" });
    }
};