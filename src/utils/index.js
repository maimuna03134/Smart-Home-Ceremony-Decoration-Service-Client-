import axios from "axios";

export const imageUpload = async (imageData) => {
  if (!imageData) {
    throw new Error("No image file selected");
  }
  const formData = new FormData();
  formData.append("image", imageData);

  const imageResponse = await axios.post(
    `https:api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
    formData
  );

  return imageResponse.data.data.display_url;
  console.log(data.data.display_url);
  return data?.data?.url;
};

export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );
  return data;
};
