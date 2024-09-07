// "use client"
// import React, {useEffect, useState} from 'react';
// import Image from "next/image";
// import {Button, CircularProgress, Modal, Paper, Skeleton, Typography} from "@mui/material";
// import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
// import CartButton from "@/custom-components/ui/CartButton";
// import {Color, Product, Variant} from "@prisma/client";
// import {getProductById} from "@/services/actions/productActions";
// import {useQuery} from "@tanstack/react-query";
// import {toast} from "react-toastify";
// import {setProductToCart} from "@/features/localStorageFunctions";
// import {notFound} from "next/navigation";
//
// const SIZES = {}
//
// function ProductPage({params}: { params: { id: string } }) {
//   const [currentVariant, setCurrentVariant] = useState<number>(0)
//   const [plasticVariant, setPlasticVariant] = useState<"PLA" | "CoPET">("PLA")
//   const [currentColor, setCurrentColor] = useState<string | "Чорний">("Чорний")
//
//   const [modal, setModal] = useState<boolean>(false)
//
//   const {data, isLoading, isFetched, error, isError} = useQuery({
//     queryKey: ["product-page", params.id],
//     queryFn: async () => {
//       const urls = [
//         `/api/products/${params.id}`,
//         `/api/variants?id=${params.id}`,
//         "/api/colors"
//       ];
//       const responses = await Promise.all(urls.map(url => fetch(url)));
//
//       if (responses.some(response => !response.ok)) {
//         throw new Error("Error response");
//       }
//
//       const [product, variants, colors] = await Promise.all(
//         responses.map(response => response.json())
//       );
//
//       return {
//         product: product as Product,
//         variants: variants as Variant[],
//         colors: colors as Color[],
//       };
//     }
//   })
//
//   if (isFetched && isError) {
//     notFound()
//   }
//
//
//   if (isLoading) {
//     return (
//       <section className={"container max-w-[1200px] h-[800px] flex mx-auto mt-16 mb-64 px-4 py-8"}>
//         <div className="flex flex-col justify-start items-stretch w-full lg:w-2/3">
//           <Skeleton className={"h-[100%]"}/>
//           <Skeleton className={"h-96 w-3/4"}/>
//           <Skeleton className={"h-64 w-2/3"}/>
//           <Skeleton className={"h-64 w-2/3"}/>
//           <div className={"h-96 grid grid-cols-12 gap-x-4 grid-rows-12"}>
//             <Skeleton className={"row-span-6 col-span-6"}/>
//             <Skeleton className={"row-span-6 col-span-6"}/>
//             <Skeleton className={"row-span-6 col-span-6"}/>
//             <Skeleton className={"row-span-6 col-span-6"}/>
//           </div>
//           <Skeleton className={"h-64 w-2/3"}/>
//           <div className={"h-64 flex flex-row gap-4"}>
//             <Skeleton className={"h-full w-1/2"}/>
//             <Skeleton className={"h-full w-1/2"}/>
//           </div>
//           <Skeleton className={"h-64 w-2/3"}/>
//           <Skeleton className={"h-64 w-full"}/>
//         </div>
//
//       </section>
//     )
//   }
//
//
//   const onAddToCartButtonHandler = () => {
//     setModal(true)
//   }
//
//   const onModalButtonHandler = () => {
//     setProductToCart({
//       plastic: plasticVariant,
//       color: data.colors.find(({name}) => name === currentColor),
//       amount: 1,
//       product: data.product,
//       variant: data.variants[currentVariant]
//     })
//     toast.success(`Товар ${data.product.name} додано до кошика.`)
//   }
//
//   return (
//     <>
//       <ShopUpperBar/>
//       <section
//         className="dark:text-neutral-200 container max-w-[1200px] flex flex-col gap-y-8 sm:flex-row mx-auto mt-[112px] mb-64 px-4 py-8 sm:gap-x-8">
//         <div className="rounded overflow-hidden h-fit">
//           <Image className="hover:scale-110 transition-transform duration-700" width={400} height={400}
//                  alt={"Product image"}
//                  src={`https://drive.google.com/uc?export=view&id=${data.product.image_name}`}></Image>
//         </div>
//         <div>
//           <Typography variant="h4" className="light:text-neutral-900 text-3xl">
//             {data.product.name} - {currentColor}
//           </Typography>
//           <Typography variant="h5" className="tlight:ext-neutral-800 text-xl">
//             {data.product.category_name}
//           </Typography>
//           <div className="mt-6">
//             <Typography variant="h5" className="light:text-neutral-700 text-3xl font-bold">
//               {data?.variants[currentVariant]?.price} грн. / шт.
//             </Typography>
//             {/*<Typography variant="h5" className="text-neutral-700 text-xl">*/}
//             {/*  Discount (optional)*/}
//             {/*</Typography>*/}
//           </div>
//           <div className="w-full mt-4">
//             <Typography variant="h6" className="light:text-neutral-600 text-lg">
//               Розмір / вага (мм. / гр.):
//             </Typography>
//             <div className="flex flex-row flex-wrap items-center justify-start gap-4 mt-2">
//               {data?.variants?.map(({weight, height, width, length, size_label}, index) => (
//                 <Button
//                   key={index}
//                   variant={currentVariant === index ? "contained" : "outlined"}
//                   color={"info"}
//                   size={"small"}
//                   onClick={() => {
//                     setCurrentVariant(prev => index)
//                   }}
//                 >
//                   {size_label}
//                 </Button>
//               ))}
//             </div>
//           </div>
//           <div className="w-full mt-4">
//             <Typography variant="h6" className="light:text-neutral-600 text-lg">
//               Вид пластику:
//             </Typography>
//             <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
//               <Button variant={plasticVariant === "PLA" ? "contained" : "outlined"} color={"info"} size={"small"}
//                       onClick={() => setPlasticVariant("PLA")}>
//                 PLA
//               </Button>
//               <Button variant={plasticVariant === "CoPET" ? "contained" : "outlined"} color={"info"} size={"small"}
//                       onClick={() => setPlasticVariant("CoPET")}>
//                 CoPET
//               </Button>
//             </div>
//           </div>
//           <div className="w-full mt-4">
//             <Typography variant="h6" className="light:text-neutral-600 text-lg">
//               Кольори:
//             </Typography>
//             <div className="flex flex-row flex-wrap items-center justify-start gap-2 mt-2">
//               {data.colors.map(({hex, name}) => (
//                 <Paper className={`w-6 h-6 cursor-pointer`} style={{background: hex}} variant={"outlined"}
//                        onClick={() => setCurrentColor(name)}>
//
//                 </Paper>
//               ))}
//             </div>
//           </div>
//
//           <div className="w-1/2 mt-4">
//             {data.product.description}
//           </div>
//
//           <div className="w-1/2 mt-8 flex flex-row justify-end gap-x-4">
//             <CartButton cart={"add"} variant={"contained"} onClick={onAddToCartButtonHandler}/>
//             {/*<CartButton cart={"remove"} variant={"contained"} color={"warning"}/>*/}
//           </div>
//         </div>
//       </section>
//       <Modal disableScrollLock className={"flex justify-center items-center"} open={modal}
//              onClose={() => setModal(false)}>
//         <Paper elevation={4} className="px-8 pr-24 pt-8 pb-6 flex flex-col items-start justify-center gap-y-8">
//           <Typography variant={"h4"} className={"font-bold light:text-neutral-700"}> Деталі товару </Typography>
//           <div className="flex flex-row items-start justify-center gap-x-8">
//             <div className={"overflow-hidden rounded flex flex-row items-center justify-center relative"}>
//               <Image className={"hover:scale-110 transition-transform duration-700"} width={250} height={250}
//                      src={`https://drive.google.com/uc?export=view&id=${data.product.image_name}`}
//                      alt={"Product image"}/>
//             </div>
//             <div className="flex flex-col items-start justify-center">
//               <Typography variant={"h5"} className={"font-bold light:text-neutral-800"}>
//                 {data.product.name}
//               </Typography>
//               <Typography variant={"h6"} className={"light:text-neutral-700"}>
//                 {data.product.category_name}
//               </Typography>
//               <Typography variant={"subtitle1"}>
//                 Колір: {currentColor}
//               </Typography>
//               <Typography variant={"subtitle1"}>
//                 Розмірність: {data?.variants[currentVariant]?.height}x{data?.variants[currentVariant]?.width}x{data?.variants[currentVariant]?.length}
//               </Typography>
//               <Typography variant={"subtitle1"}>
//                 Вага: {data?.variants[currentVariant]?.weight} грам
//               </Typography>
//               <Typography variant={"subtitle1"}>
//                 Тип пластику: {plasticVariant}
//               </Typography>
//               <Typography variant={"h5"}>
//                 Ціна: {data?.variants[currentVariant]?.price} грн
//               </Typography>
//             </div>
//           </div>
//           <CartButton
//             cart={"add"}
//             className={"self-end mr-[-4rem]"}
//             variant={"contained"}
//             onClick={onModalButtonHandler}
//           />
//         </Paper>
//       </Modal>
//     </>
//   )
// }
//
// export default ProductPage