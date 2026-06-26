export const imageUpload =async(image)=>{
const formData =new FormData();
formData.append("image",image)
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
const data=await response.json();
return data.data;
} 