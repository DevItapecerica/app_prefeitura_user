require('dotenv').config()

const auth = (request, reply, next) => {
    const apiKey = request.headers['authorization'];
    
    apiKey === process.env.API_KEY ? (next()) : (reply.status(401).send('Acesso não permitido'))
}

module.exports = auth