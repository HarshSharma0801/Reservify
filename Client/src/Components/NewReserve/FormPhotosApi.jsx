import React , {useState} from 'react';
import axios from 'axios'


const PhotosApi = async (data , SetPhotosLink)=>{



 try {

   await axios.post('/cloudinary' , data).then(res=>{
      if(res.data){
         SetPhotosLink(res.data);
      }

   });
    
 } catch (error) {
    console.log(error)
 }



}

export default PhotosApi