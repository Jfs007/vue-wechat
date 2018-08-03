import { resolve } from "url";
import { rejects } from "assert";

// upload 处理文件
export default class Upload {
  constructor(file, option) {
    this.file = file;
  }
  filter(callback) {
    return callback(this.file, this.file.size, this.file.name)
  }
  getDataURL() {
    let file = this.file
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (evt) => {
        let dataUrl = evt.target.result;
        resolve(dataUrl);
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  uploadPre(name) {
    let file = this.file;
    let formData = new FormData();
    formData.append(name, file);
    return formData
  }
  getFileInfo() {
    let file = this.file;
    let size = file.size / 1024;
    size = size > 1024 ? (size / 1024).toFixed(2) + ' MB' : size.toFixed(1) + ' KB';
    return { fileName: file.name, size };
  }

}