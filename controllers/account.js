const Users = require('../models/users')
const bcrypt = require('bcrypt')

exports.getAccount = (req, res) => {
    Users.findOne({
        where: {id: req.query.uid}
    })
        .then((response => {
            res.status(200).json(response)
        }))
        .catch( err => {
            return res.status(400).json({error: err})
        }) 
}

exports.createAccount = (req, res) => {
    Users.findOne({ where: { login: req.body.login} })
        .then( (response) => {
            if(response){
                console.log('user already exist')
                res.status(400).send('user already exist')
            }
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new Users({
                    login: req.body.login,
                    password: hash,
                    role: 'ROLE_USER',
                    status: 'open',
                })
                user.save()
                    .then( ()=> {
                        Users.findOne({ where: {login: req.body.login} })
                        .then( (response) => {
                            console.log('user created')
                            res.status(201).json({
                                user: {
                                    uid: response.dataValues.id,
                                    login: response.dataValues.login,
                                    password: response.dataValues.password,
                                    roles: response.dataValues.role,
                                    createdAt: response.dataValues.createdAt,
                                    updatedAt: response.dataValues.updateAt,
                                }
                            })
                        })
                    })
                })
            })
        .catch(err => {
            console.log(err)
        })
}

exports.editAccount = (req, res) => {
    Movies.findOne( {
        where : { id: req.query.movieId},
        include: ['category']
    })
        .then( (response => {
            res.status(200).json({category: response.dataValues.category.dataValues.name})
        }))
        .catch( err => {
            console.log(err)
            return res.status(404).json({error: err})
        }) 
}