export default function getImageSrc(image:string):string {
  return `${process.env.NEXT_PUBLIC_API_URL}/static/${image}`
}