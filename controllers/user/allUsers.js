import User from '../../models/user'

export const AllUsers = async (req, res) => {
    try {
        return User.find()
                   .select(['-photo'])
                   .then((users) => res.send(users))
                   .catch((err) => res.send(err)) 
    } catch (err) {
        return await res.status(400).json({
            error: 'Could not return all users, there was an error.'
        })
    }
}