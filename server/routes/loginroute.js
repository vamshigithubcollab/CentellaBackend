const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtgenerator = require("../utils/jwtgenerator");
const validinfo = require("../middleware/validinfo");

router.post("/login", validinfo, async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
       
        const response = await pool.query("SELECT * FROM authorise WHERE user_email = $1", [user_email]);

        if (response.rows.length === 0) {
            return res.json("User not found");
        } else {
            const validity = await bcrypt.compare(user_password, response.rows[0].user_password);

            if (!validity) {
                return res.json("Invalid Password");
            }
            token = jwtgenerator(response.rows[0].id);
            return res.json({"token":token ,"role":response.rows[0].user_role});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});

router.post("/register", validinfo, async (req, res) => {
    try {
        const { user_name, user_email, user_password } = req.body;
        const user = await pool.query("SELECT * FROM authorise WHERE user_email = $1", [user_email]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists!");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptpassword = await bcrypt.hash("user_password", salt);

        const newuser = await pool.query("INSERT INTO authorise (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4) RETURNING *", [user_name, user_email, bcryptpassword,"USER"]);

        // Return the newly created user data
        return res.json(newuser.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});


module.exports = router;
