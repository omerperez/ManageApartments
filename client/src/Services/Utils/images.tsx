function removeImageFromImages(
  removeImageIndex: number,
  images: (string | File)[],
) {
  const removeImage = images[removeImageIndex];
  return images.filter((img) => img !== removeImage);
}

export { removeImageFromImages };
