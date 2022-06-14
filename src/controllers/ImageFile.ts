import path from 'path';
import fs from 'fs';

export class ImageWrap {
  fileName: string;
  fileExtension: string | null;
  width?: number;
  height?: number;
  allowedExtensions: Array<string> = ['jpg', 'png', 'gif', 'jpeg', 'bmp'];
  imagesPath: string = path.resolve(__dirname, '../public/images');
  thumbsPath: string = path.resolve(__dirname, '../public/images/thumbs');
  filePath: string;
  thumbFilePath = '';

  constructor(fileName: string) {
    this.fileName = fileName;
    const ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    this.fileExtension = this.allowedExtensions.includes(ext) ? ext : null;
    // if extention is not null fileName should be without extension
    if (this.fileExtension !== null) {
      // set fileName without extension
      this.fileName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      this.filePath = this.imagesPath + `/${this.fileName}.${this.fileExtension}`;
    } else {
      // future features to find file with any of the supported extensions exist
      // if the file name passed without extension
      this.filePath = this.imagesPath + `/${this.fileName}.jpg`;
    }
  }

  setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;

    if (this.fileExtension !== null) {
      this.thumbFilePath =
        this.thumbsPath + `/${this.fileName}_${this.width}_${this.height}.${this.fileExtension}`;
    } else {
      this.thumbFilePath = this.thumbsPath + `/${this.fileName}_${this.width}_${this.height}.jpg`;
    }
  }

  getDimensions() {
    return { width: this.width, height: this.height };
  }

  fileExist() {
    if (this.fileName === undefined) return false;
    return fs.existsSync(this.filePath);
  }

  thumbExist() {
    if (this.width === undefined || this.height === undefined) return false;
    return fs.existsSync(this.thumbFilePath);
  }
}
