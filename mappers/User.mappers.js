exports.modelToDTO = (user) => {
    if (!user) return {}
    return {
        id: user.id,
        username: user.username
    }
}