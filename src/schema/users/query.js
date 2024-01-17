module.exports = {
    async me(parent, args, { models, currentUser }, info) {
        try {
            const user = await models.User.findOne({
                where: {
                    username: currentUser.username
                }
            })

            return user
        } catch (error) {
            console.error(error.message);
        }
    }
}