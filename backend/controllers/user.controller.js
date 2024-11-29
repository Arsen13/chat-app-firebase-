const { db } = require("../db/firebase");

const getUserForSidebar = async (req, res) => {
    try {
        const currentUser = req.user;
        const users = await db.collection("users").where("username", '!=', currentUser.username).get();
        
        const userList = []
    
        users.forEach(user => {
            userData = user.data();
            delete userData.password;
            userList.push(userData);
        })
    
        res.status(200).json(userList)
    } catch (error) {
        console.log("Error in 'getUserForSidebar' controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getUserForSidebar;