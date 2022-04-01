
const jwt = require('jsonwebtoken')

module.exports =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, 'TOKEN_SECRET')
        const uid = decodeToken.params.uid
        const role = decodeToken.role
        if(!uid) {
            res.status(401).send('Authentification necessaire')
        }
        else if (req.query.uid && req.query.uid != uid) {
            console.log('User ID non valable')
            res.status(422).send('Paramètres de connection invalide')
        }
        else if (role != 'ROLE_ADMIN') {
            console.log('Compte admin necessaire')
            res.status(403).send('Compte admin necessaire')
        }
        else {
            console.log('Requête autorisée!')
            next()
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something broke!');
    }
}