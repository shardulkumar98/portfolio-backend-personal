export interface IUser {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IFiles {
  category: {
    enum: string
  }
  file: {
    subCategory: string
    fileDetails: {
      fileName: string
      fileLink: string
      folderName: string
      format: string
    }
  }
}
