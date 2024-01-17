const models = require('../../models')
const { verifyAccessToken } = require('../../utils/TokenUtils')

const context = async ({ req, res }) => {
    if (req.body.operationName === 'Login' || req.body.operationName === 'Register' || req.body.operationName === 'Refresh' || req.body.operationName === 'Logout') {
        return { models, req, res }
    }
    const authorizationHeader = req.headers['authorization']
    let token = ''
    if(authorizationHeader) {
        token = req.headers['authorization'].split(" ")[1] || ''
    }

    const user = await verifyAccessToken(token)
    return { models, currentUser: user }
}

module.exports = { context }