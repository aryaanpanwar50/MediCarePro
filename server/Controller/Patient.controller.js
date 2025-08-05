const Patient = require("../Model/Patient.model");
const bcrypt = require("bcrypt");
const {createToken} = require('../MiddleWare/authMiddleWare')

const registerUser = async (req,res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
        name,
        email,
        password:hashedPassword,
    })

    await newPatient.save();
    res.status(201).json({
      success: true,
        message: "Patient registered successfully",
    })

  } catch (error) {
    console.error("Registation error", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const loginUser = async (req,res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const patient = await Patient.findOne({email});
    if(!patient){
        return res.status(404).json({
            success: false,
            error: "Patient not found",
        });
    }
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const { accessToken, refreshToken } = createToken(patient);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
    });

    

  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
