import React from 'react';
import AdminLoginForm from "@/custom-components/ui/(admin)/LoginPage/AdminLoginForm";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <main className="w-full h-dvh bg-black/5 flex justify-center items-center">
      <AdminLoginForm/>
    </main>
  )
}

export default Page