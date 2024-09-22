import CreateProductPage_ImagesForm
  from "@/custom-components/ui/(admin)/CreateProductPage/CreateProductPage_ImagesForm";
import CreateProductPage_ProductForm
  from "@/custom-components/ui/(admin)/CreateProductPage/CreateProductPage_ProductForm";
import CreateProductPage_VariantsForm
  from "@/custom-components/ui/(admin)/CreateProductPage/CreateProductPage_VariantsForm";


interface ICreateProductPageProps {
  children: React.ReactNode;
}

function CreateProductPage({children}:ICreateProductPageProps) {
  return (
    <div className="w-full flex flex-col gap-y-4">
      {children}
    </div>
  )
}

export default Object.assign(CreateProductPage, {
  ImagesForm: CreateProductPage_ImagesForm,
  ProductsForm: CreateProductPage_ProductForm,
  VariantsForm: CreateProductPage_VariantsForm,
})