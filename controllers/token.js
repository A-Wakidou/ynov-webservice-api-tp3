const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createRefreshToken = (req, res) => {
    const decodedToken = jwt.verify(req.query.refreshToken, 'TOKEN_SECRET')
    if(decodedToken) {
        const newAccessToken = jwt.sign(
            {
                params:  {
                    uid: decodedToken.uid,
                    login: decodedToken.params.login,
                    password: decodedToken.params.password,
                    role: decodedToken.params.role
                }
            },
            'TOKEN_SECRET',
            {expiresIn: '1h'}
        )
        const newRefreshToken = jwt.sign(
            {
                params:  {
                    uid: decodedToken.uid,
                    login: decodedToken.params.login,
                    password: decodedToken.params.password,
                    role: decodedToken.params.role
                }
            },
            'REFRESH_TOKEN_SECRET',
            {expiresIn: '1h'}
        )
        res.status(200).json({accessToken: newAccessToken, refreshToken: newRefreshToken})
    }
}

exports.login = (req, res, next) => {
    Users.findOne({ where: { login: req.body.login} })
        .then(user => {
            if(!user) {
                console.log('Utilisateur inexistant')
                return res.status(404).json({error : 'Utilisateur non trouvé!'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if(!valid) {
                        console.log('Mot de passe invalide')
                        return res.status(404).json({error : 'Mot de passe incorrect!'})
                    }
                    console.log('Token créé !')
                    res.status(201).json({
                        accessToken: jwt.sign(
                            {
                                params:  {
                                    uid: user.id,
                                    login: user.login,
                                    password: user.password,
                                    role: user.role
                                }
                            },
                            'TOKEN_SECRET',
                            {expiresIn: '1h'}
                        ),
                        refreshToken: jwt.sign(
                            {
                                params:  {
                                    uid: user.id,
                                    login: user.login,
                                    password: user.password,
                                    role: user.role
                                }
                            },
                            'REFRESH_TOKEN_SECRET',
                            {expiresIn: '2h'}
                        ),
                    })
                })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error })
            } )
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error})
        })
}