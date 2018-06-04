function resizeImageElement(image, maxSize) {
  let canvas = document.createElement('canvas'),
    max_size = maxSize,
    width = image.width,
    height = image.height;
  if (width > height) {
    if (width > max_size) {
      height *= max_size / width;
      width = max_size;
    }
  }
  else {
    if (height > max_size) {
      width *= max_size / height;
      height = max_size;
    }
  }
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(image, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg')
}

export default {
  resizeImage(url, maxSize = 1024) {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.src = url
      image.onload = () => {
        resolve(resizeImageElement(image, maxSize));
      }
    })
  },
}