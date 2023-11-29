module.exports = {
    async me(parent, args, { models, currentUser }, info) {
        try {
            const user = await models.User.findOne({
                where: {
                    id: currentUser.id
                }
            })

            return user
        } catch (error) {
            console.error(error.message);
        }
    }
}