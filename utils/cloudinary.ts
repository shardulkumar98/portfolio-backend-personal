import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'darcbngft',
  api_key: '414923218964754',
  api_secret: 'JwQhPIaO2qpzexZt5ywQylDHHDY',
})

export const uploadCloudinary = async (path: string, folder: string): Promise<any> => {
  try {
    const uploadFileCloud = await cloudinary.v2.uploader.upload(path, {
      // upload_preset: 'ml_default',
      folder: folder,
    })
    console.log('uploadFileCloud :>> ', uploadFileCloud)
    return uploadFileCloud
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return error
  }
}
