import { useQuery } from "@tanstack/react-query";
import { getProductAction } from "../actions/get-products";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();
  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const offset = (Number(page) - 1) * Number(limit);
  const sizes = searchParams.get("sizes") || "";
  const priceRange = searchParams.get("price")?.split("-") || "any";
  const query = searchParams.get("query") || "";

  return useQuery({
    queryKey: ["products", { offset, limit, sizes, gender, priceRange, query }],
    queryFn: () =>
      getProductAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes: sizes,
        gender: gender,
        minPrice: Number(priceRange[0]) || undefined,
        maxPrice: Number(priceRange[1]) || undefined,
        query: query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
