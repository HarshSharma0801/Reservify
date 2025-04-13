 import express from 'express'
 import Stripe from "stripe";


 const Payment = express();


 const secret = process.env.Stripe_SECRET ;
 const stripe  = new Stripe(secret);


 Payment.post('/Payment' , async(req,res)=>{
 
    const product = req.body.Pay;
    const Bookingdetails = req.body.Book;
   const cookies = req.cookies;
   console.log(cookies , "cookies aree here")
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items: [
                {
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:product.name,
                            description:product.schedule
                        },
                        unit_amount:product.amount*100*83
                    },
                    quantity:1
                }
            ],
           billing_address_collection: 'required', // Require billing address
            shipping_address_collection: {
                allowed_countries: ['IN'], // List of allowed countries
            },
            mode: 'payment',
              
            mode: 'payment',

            success_url:`${process.env.FRONTEND_API_URL}/success`,
            cancel_url: `${process.env.FRONTEND_API_URL}/account`,
          });
        res.status(200).json({id:session.id , Details:Bookingdetails});

    } catch (error) {
        console.error(error);
    }

 })


export default Payment
