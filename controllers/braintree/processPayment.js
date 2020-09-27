import { gateway } from './braintree'

export const processPayment = (req, res) => {
    
   let nonceFromTheClient = req.body.paymentMethodNonce
   let amountFromTheClient = req.body.amount

   let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
   }, (error, result) => {
        if(error) {
            res.status(500).json(error)
        } else {
            res.json(result)
        }
   })
}