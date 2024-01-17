const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const verifyAccessToken = async (token) => {
    try {
        const user = jwt.verify(token, process.env.ACCESS_SECRET_KEY)        
        return Promise.resolve(user)
    } catch (error) {
        throw new GraphQLError("Invalid access token", {
            extensions: {
                code: "FORBIDDEN"
            }
        })
    }

    // jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, decoded) => {
    //     if(error) {
    //         throw new GraphQLError("Invalid access token", {
    //             extensions: {
    //                 code: "FORBIDDEN"
    //             }
    //         })
    //     }

    //     return decoded
    // })
}

const createTokens = async (payload) => {
    try {
        const accessToken = jwt.sign({username: payload.username}, process.env.ACCESS_SECRET_KEY, {
            expiresIn: '15m'
        })

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY,{
            expiresIn: '7d'
        })

        return Promise.resolve({accessToken, refreshToken})
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = {
    verifyAccessToken,
    createTokens
}