export const InstallShot = (req, res, next) => {
    if(req.product.installShot.data) {
        res.set('Content-Type', req.product.installShot.contentType)
        return res.send(req.product.installShot.data)
    }
    next()
}