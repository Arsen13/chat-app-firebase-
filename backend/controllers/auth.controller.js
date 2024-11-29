const { db } = require('../db/firebase');
const bcrypt = require('bcrypt');
const setAuthToken = require('../utils/setAuthToken');

const signup = async (req, res) => {
    try {
        const { fullName, username, password, gender } = req.body;

        const user = await db.collection('users').where('username', "==", username).get();

        if (!user.empty) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture
        const profilePic = gender === 'male' 
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const userRef = db.collection('users').doc()
        await userRef.set({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic
        });

        setAuthToken(userRef.id, res);

        res.status(201).json({
            fullName,
            username,
            profilePic
        })
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userData = await db.collection("users").where("username", "==", username).get();
        if (userData.empty) {
            return res.status(400).json({ error: "User not found" });
        }

        userData.forEach(async (user) => {
            const isPasswordCorrect = await bcrypt.compare(password, user.data().password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Password doesn't match" });
            }

            setAuthToken(user.id, res);

            return res.status(200).json({message: "Successfully logged in" });
        })
            
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", '', { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { signup, login, logout };