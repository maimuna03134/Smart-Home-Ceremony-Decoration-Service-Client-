import axios from "axios";

export const imageUpload = async (imageData) => {
    if (!imageData) {
      throw new Error("No image file selected");
    }
const formData = new FormData();
formData.append("image", imageData);

const imageResponse = await axios.post(
  `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
  formData
);

 return imageResponse.data.data.url;
    // console.log(data.data.display_url);
//   return data?.data?.url;
};
