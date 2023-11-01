import express from "express";
import cloudinary from "cloudinary";


cloudinary.config({ 
    cloud_name: process.env.Cloudinary_Name, 
    api_key: process.env.Cloudinary_APIKEY, 
    api_secret: process.env.Cloudinary_SECRET,
    secure: true
  });


const photos = express();

photos.post("/cloudinary", async (req, res) => {
  

  try {
    const files = req.body;
    const Photos = [];
    
    
    for (let i = 0; i < files.length; i++) {
       const uploadPhoto = await cloudinary.v2.uploader
       .upload(files[i] , {
        upload_preset:'Reservify',
        folder: 'Reservify',
        use_filename: true,
        overwrite:false

       });
     Photos.push( {url: uploadPhoto.url , photoId: uploadPhoto.public_id});

        
    }


    res.status(200).send(Photos);

  

  

  } catch (error) {
    console.log(error);
  }
});

export default photos
