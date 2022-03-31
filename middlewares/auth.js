const jwt = require('jsonwebtoken')

module.exports =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        const userId = decodeToken.userId
        if (req.query.userId && req.query.userId != userId) {
            throw 'User ID non valable'
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