const auth = require('../controllers/auth');

function checkAuth(req, resp, next) {
    const token = req.cookies['auth_token'];
    console.log(token);
    if(token && auth.checkToken(token)) {
        next();
    } else{
        resp.status(400);
        resp.send('Not authorized!');
    }
}

module.exports = checkAuth;