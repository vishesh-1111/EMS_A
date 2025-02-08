const normalizeSrc = src => src.replace(/^\//, "");

export default function cloudinaryLoader({ src, width, quality }) {
  
    console.log(src,width,quality);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.log('error');
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is required in the environment"
    );
  }

  console.log('yay');
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(",")}/${normalizeSrc(src)}`;
}