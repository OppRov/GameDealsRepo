const bcrypt = require('bcrypt')


exports.login = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
       
        
    } catch (error) {
        res.status(500).json(error)
    }
}