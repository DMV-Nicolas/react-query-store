import { Button, Image, Input, Textarea } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { useCreateProduct } from ".."

interface FormInputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const { createProductMutation } = useCreateProduct()
  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors: formErrors },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "men's clothing",
      image: "https://i.blogs.es/c68014/casa-3d/450_1000.jpeg",
    },
  })

  const watchImage = watch("image")

  const handleSubmit = formHandleSubmit((data) => {
    createProductMutation.mutate(data)
  })

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Input
              className="mt-2"
              type="text"
              label="Titulo del producto"
              isInvalid={!!formErrors.title}
              {...register("title", {
                required: { value: true, message: "Este campo es requerido" },
              })}
            />
            <Input
              className="mt-2"
              type="number"
              label="Precio del producto"
              isInvalid={!!formErrors.price}
              {...register("price", {
                required: { value: true, message: "Este campo es requerido" },
                valueAsNumber: true,
              })}
            />
            <Input
              className="mt-2"
              type="url"
              label="Url del producto"
              isInvalid={!!formErrors.image}
              {...register("image", {
                required: { value: true, message: "Este campo es requerido" },
              })}
            />
            <Textarea
              className="mt-2"
              label="Descripcion del producto"
              isInvalid={!!formErrors.description}
              {...register("description")}
            />
            <select
              className={`rounded-md p-3 mt-2 ${
                !!formErrors.category ? "bg-red-900" : "bg-gray-800"
              } w-full`}
              {...register("category", {
                required: { value: true, message: "Este campo es requerido" },
              })}
            >
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>

            <br />
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              isDisabled={!!createProductMutation.isPending}
            >
              {createProductMutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={watchImage} />
          </div>
        </div>
      </form>
    </div>
  )
}
