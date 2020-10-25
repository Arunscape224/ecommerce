exports.Logout = async (req, res) => {
    await res.clearCookie('access-token')
    await res.json({ message: 'successfully logged out' })
 }