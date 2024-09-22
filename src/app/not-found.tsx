import Link from 'next/link'
import {Typography} from "@mui/material";

export default async function NotFound() {

  return (
    <main className="flex flex-col items-center justify-center gap-y-6">
      <img src={"/notfound-image.png"} width={1000} height={500} alt={""}/>
      <Typography variant="h4" className="font-bold">
        Код помилки 404
      </Typography>
      <Typography variant="h5" className="text-center text-neutral-600">
        Неправильно набрано адресу або такої сторінки на нашому сайті вже більше не існує.
      </Typography>
      <Typography variant="h6" className="text-neutral-600">
        Перейти на  <Link href="/" className="text-blue-600 ">головну сторінку</Link>
      </Typography>
    </main>
  )
}