 import express from 'express'
 import Stripe from "stripe";


 const Payment = express();


 const secret = process.env.Stripe_SECRET ;
 const stripe  = new Stripe(secret);


 Payment.post('/Payment' , async(req,res)=>{
 
    const product = req.body.Pay;
    const Bookingdetails = req.body.Book;
   
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
              
            mode: 'payment',

            success_url:`https://reservify-frontend.vercel.app//success`,
            cancel_url: `https://reservify-frontend.vercel.app//account`,
          });
        res.status(200).json({id:session.id , Details:Bookingdetails});

    } catch (error) {
        console.error(error);
    }

 })


export default Payment