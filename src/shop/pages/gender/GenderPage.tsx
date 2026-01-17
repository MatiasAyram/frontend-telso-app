import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { useParams } from "react-router";

type possibleGenders = "men" | "women" | "kid";

export const GenderPage = () => {
  const { gender } = useParams<{ gender: possibleGenders }>();
  const { data } = useProducts();
  const genderLabel: Record<possibleGenders, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  };
  const finalLabel = gender ? genderLabel[gender] : "";
  return (
    <>
      <CustomJumbotron title={`Productos para ${finalLabel}`} />
      <ProductsGrid products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};
