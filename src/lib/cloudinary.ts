export const uploadImage = async (file: File) => {
  console.log('Cloudinary Config:', {
    cloudName: import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  });
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  return response.json();
};
