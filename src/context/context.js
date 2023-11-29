const models = require('../../models')
const { verifyAccessToken } = require('../../utils/TokenUtils')

const context = async ({ req, res }) => {
    if (req.body.operationName === 'Login' || req.body.operationName === 'Register' || req.body.operationName === 'Refresh') {
        return { models }
    }

    const token = req.headers['authorization'].split(" ")[1] || ''

    const user = await verifyAccessToken(token)

    return { models, currentUser: user }
}

module.exports = { context }