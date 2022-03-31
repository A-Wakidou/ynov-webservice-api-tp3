const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createRefreshToken = (req, res) => {
    Users.findOne({
        where: {id: req.query.id}
    })
        .then( (response => {
            res.status(200).json({movies: response})
        }))
        .catch( err => {
            return res.status(400).json({error: err})
        }) 
}

exports.login = (req, res, next) => {
    Users.findOne({ where: { login: req.body.login} })
        .then(user => {
            if(!user) {
                console.log('Utilisateur inexistant')
                return res.status(401).json({error : 'Utilisateur non trouvé!'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if(!valid) {
                        console.log('Mot de passe invalide')
                        return res.status(401).json({error : 'Mot de passe incorrect!'})
                    }
                    console.log('connecté!')
                    res.status(200).json({
                        token: jwt.sign(
                            {
                                params:  {
                                    user: user.login,
                                    password: user.password,
                                }
                            },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '1h'}
                        )
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