const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser');
var token;
var sessionId;

var tokenMap = new Object();
function get(k) {
    return tokenMap[k];
}

//User Auth
router.post('/authenticate', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password; 
    sessionId = req.body.sessionId;
    token = uuidv1();

    tokenMap[sessionId] = token;

    if(sessionId != null && username == "Amarabandu" && password == "Rupasinghe"){
        res.json({
            success: true,
            msg: "username/password correct",
        })
    } else {
        res.json({
            success: false,
            msg: "username/password incorrect"
        })
    };
});

//CSRF TOKEN RESPONDER
router.post('/getToken', (req, res, next) => {
    var requestSessionId = req.body.sessionId;
    if(requestSessionId != null && requestSessionId == sessionId){
        res.json({
            success: true,
            token: get(sessionId),
        })
    }
});

//Post Token
router.post('/postToken', (req, res, next) => {
    
    var resToken = req.body.token;
    var reqSessionId = req.body.sessionId;
    if(token != null && reqSessionId == sessionId && resToken == get(reqSessionId)){
        
        res.json({
            success: true,
            msg: "token varified",
        })

    }
});


module.exports = router;