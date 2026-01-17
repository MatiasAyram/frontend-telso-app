import { Navigate, useNavigate, useParams } from "react-router";
import { useProduct } from "@/admin/hooks/useProduct";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { ProductForm } from "./ui/ProductForm";
import type { Product } from "@/interfaces/product.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isError,
    isLoading,
    productMutation,
  } = useProduct(id ?? "");
  const isPosting = productMutation.isPending;
  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subTitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (
    productLike: Partial<Product> & { files?: File[] }
  ) => {
    console.log({ productLike });
    await productMutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success(
          `El producto ${data.title} ha sido actualizado correctamente`,
          {
            position: "top-right",
          }
        );
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        toast.error(`Error al crear el producto: ${error}`, {
          position: "top-right",
        });
      },
    });
  };
  if (isError) {
    return <Navigate to="/admin/products" />;
  }
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }
  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={title}
      subTitle={subTitle}
      product={product}
      onSubmit={handleSubmit}
      isPosting={isPosting}
    />
  );
};
