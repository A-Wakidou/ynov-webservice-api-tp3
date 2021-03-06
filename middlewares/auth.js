const jwt = require('jsonwebtoken')

module.exports =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, 'TOKEN_SECRET')
        const uid = decodeToken.params.uid
        const role = decodeToken.params.role
        if(!uid) {
            res.status(401).send('Authentification necessaire')
        }
        if (role == 'ROLE_ADMIN') {
            req.params.role = 'ROLE_ADMIN'
            req.params.uid = uid
            next()
        }
        if (role == 'ROLE_USER') {
            req.params.role = 'ROLE_USER'
            req.params.uid = uid
            next()
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something broke!');
    }
}