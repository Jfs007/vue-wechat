import conf from '@/conf/common-conf.js'

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
  toBlob(dataURL, mime) {
    let dataArr = dataURL.split(',')
    let base64 = dataArr[1];
    let bytestr = window.atob(base64);
    let bytesL = bytestr.length;
    let abuffer = new ArrayBuffer(bytesL);
    let u8arr = new Uint8Array(bytesL);
    // 字符串转二进制。。。
    while (bytesL--) {
      u8arr[bytesL] = bytestr.charCodeAt(bytesL);
    };
    let blobFile = new Blob([u8arr], { type: mime });
    return blobFile;
    // let 
    // let buffer = new Buffer
  }
  dataURLMime(dataURL) {
    let dataArr = dataURL.split(',');
    let types = dataArr[0].match(/:(.*?);/)
    return types ? types[1]: '';
  }
  imageCompress(dataURL) {
    let mime = this.dataURLMime(dataURL);
    let image = new Image();
    image.src = dataURL;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        // 最大的图片大小
        let CHAT_MAX_SIDE_LENGTH = conf.CHAT_MAX_SIDE_LENGTH;
        // 压缩比
        let compressionRatio = CHAT_MAX_SIDE_LENGTH / image.width > 1 ? 1 : CHAT_MAX_SIDE_LENGTH / image.width;
        let canvas = document.createElement('canvas');

        let compressionWidth = image.width * compressionRatio
        let compressionHeight = image.height * compressionRatio
        canvas.width = compressionWidth + 0.1;
        canvas.height = compressionHeight + 0.1;
        var ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, compressionWidth, compressionHeight);
        ctx.drawImage(
          image, 0, 0, compressionWidth, compressionHeight
        );
        resolve(this.toBlob(canvas.toDataURL(mime), mime));
      }
      image.onerror = (error) => {
        reject(error)
      }
    })
    
    // // canvas
    // return this.toBlob(canvas.toDataURL(mime), mime);

  }
  // 传入type image/file  dataURL为文件的转化后的值,,,
  async uploadPre(type, dataURL) {
    let file = this.file;
    let filename = file['name'];
    if (file.size/ 1024 > 641) {
      file = await this.imageCompress(dataURL);
    }
    // 压缩文件
    // let file = this.imageCompress(dataURL);
    let formData = new FormData();
    formData.append(type, file, filename);
    return formData;
  }


  getFileInfo() {
    let file = this.file;
    let size = file.size / 1024;
    size = size > 1024 ? (size / 1024).toFixed(2) + ' MB' : size.toFixed(1) + ' KB';
    return { fileName: file.name, size };
  }

}