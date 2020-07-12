export default (src: string) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img.src)
    img.onerror = reject
    img.src = src
  })
}
