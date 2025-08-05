const jwt = require("jsonwebtoken");
const Patient = require("../Model/Patient.model.js"); // Remove destructuring

require("dotenv").config();

const createToken = (patient) => {
  const tokenPayload = {
    id: patient._id,
    name: patient.name,
    email: patient.email,
  };

  const accessTokenPayload = {
    id: patient._id,
  };

  const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(tokenPayload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }
  
  
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    
    const patient = await Patient.findById(decoded.id);
    if (!patient) {
      return res.status(404).json({ success: false, error: "Patient not found" });
    }
    req.patient = patient;
    req.accessToken = decoded;
    next();
    
  } catch (error) {

    return res.status(403).json({ success: false, error: "Invalid token" });
  }
};

module.exports = { createToken, verifyToken };
