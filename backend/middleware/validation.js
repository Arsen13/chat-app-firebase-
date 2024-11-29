const signupValidation = (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || fullName.length < 6) {
            return res.status(400).json({ error: "The minimum length of the full name is 6 characters" });
        }

        if (!username || username.length < 6) {
            return res.status(400).json({ error: "The minimum length of th username is 6 characters" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "The minimum length of password is 6 characters" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" });
        }

        if (gender !== "male" && gender !== "female") {
            return res.status(400).json({ error: "Incorrectly selected gender"})
        }

        next();

    } catch (error) {
        console.log("Error in signup validation middleware", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
} 

const loginValidation = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || username.length < 6) {
            return res.status(400).json({ error: "The minimum length of the full name is 6 characters" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "The minimum length of password is 6 characters" });
        }

        next();

    } catch (error) {
        console.log("Error in login validation middleware", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { signupValidation, loginValidation };