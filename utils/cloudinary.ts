// import cloudinary from 'cloudinary'

// cloudinary.v2.config({
//   cloud_name: 'darcbngft',
//   api_key: '414923218964754',
//   api_secret: 'JwQhPIaO2qpzexZt5ywQylDHHDY',
// })

// export const uploadCloudinary = async (path: string, folder: string): Promise<any> => {
//   try {
//     const uploadFileCloud = await cloudinary.v2.uploader.upload(path, {
//       // upload_preset: 'ml_default',
//       chunk_size: 7000000,
//       folder: folder,
//     })
//     return uploadFileCloud
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error)
//     return error
//   }
// }

import cloudinary from 'cloudinary'
import { extname } from 'path'

cloudinary.v2.config({
  cloud_name: 'darcbngft',
  api_key: '414923218964754',
  api_secret: 'JwQhPIaO2qpzexZt5ywQylDHHDY',
})

export const uploadCloudinary = async (path: string, folder: string): Promise<any> => {
  try {
    // Determine the resource type based on file extension
    const extension = extname(path).toLowerCase()
    let resourceType = 'auto' // Cloudinary can auto-detect, but you can be explicit if needed

    if (['.jpg', '.jpeg', '.png'].includes(extension)) {
      resourceType = 'image'
    } else if (['.mp4', '.mov', '.mkv'].includes(extension)) {
      resourceType = 'video'
    }

    const uploadFileCloud = await cloudinary.v2.uploader.upload(path, {
      resource_type: resourceType as 'auto' | 'image' | 'video',
      chunk_size: 7000000,
      folder: folder,
    })

    return uploadFileCloud
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error // Rethrow the error after logging it
  }
}
