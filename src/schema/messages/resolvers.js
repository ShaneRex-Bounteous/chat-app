module.exports = {
    createdAt(parent, args, ctx, info) {
        return parent.createdAt.toISOString()
    }
}