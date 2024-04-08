const express = require("express");
const cors = require("cors");
const fetch=(...args)=>
    import('node-fetch').then(({default:fetch})=>fetch(...args));
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
  }));

//credentails
const CLIENT_ID="1ffe90f1710c8433e834";
const CLIENT_SECRET="140891d9dc816fa927935ea724b2188402265ecf"


//get data from frontend

app.get('/getAccessToken',async function (req,res){
    // console.log(req.query.code);
    const params = "?client_id="+ CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    // console.log(params);
    await fetch("https://github.com/login/oauth/access_token"+params,{
        method:"POST",
        headers:{
            "Accept":"application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        // console.log(data);
        res.json(data);
    });
});

//get user data

app.get('/getdata',async function (req,res){
    // const accessToken = req.headers.authorization;
    // if (!accessToken) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    req.get("Authorization"); //Bearer Access Token
    await fetch("https://api.github.com/user",{
        method:"GET",
        headers:{
            "Authorization":req.get("Authorization")
        }
    }).then((response)=>{
        if (!response.ok) {
            throw new Error("Unauthorized");
        }
        return response.json();
    }).then((data)=>{
        // console.log(data);
        res.json(data);
    });
})


// linkedin oauth
// Credentials
const LINKEDIN_CLIENT_ID = "86csquir6e765h";
const LINKEDIN_CLIENT_SECRET = "9ctYChFi863yQEXK";
const REDIRECT_URI = "http://localhost:5000/linkedin/callback"; // Update the redirect URI as needed

// LinkedIn OAuth callback route
app.get("/linkedin/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({ error: "No authorization code provided" });
    }

    try {
        const requestBody = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: LINKEDIN_CLIENT_ID,
            client_secret: LINKEDIN_CLIENT_SECRET
        };
        const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(requestBody).toString()
        });
        const data = await response.json();
        // Now you have the access token, you can proceed with your logic (e.g., validate the token, fetch user data)
        console.log("LinkedIn Access Token:", data.access_token);
        res.redirect("/user"); // Redirect to your frontend after successfully obtaining the access token
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while exchanging the authorization code for an access token" });
    }
});

app.use("/auth",require("./routes/loginroute"));
app.use("/user",require("./routes/user"));
app.listen(5000,()=>{
    console.log("listening to port at 5000");
})