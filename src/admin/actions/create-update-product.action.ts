import { tesloApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {
  await sleep(1021);

  const { id, user, images = [], files = [], ...resto } = productLike;
  const isCreating = id === "new";
  resto.stock = Number(resto.stock || 0);
  resto.price = Number(resto.price || 0);

  // Prepara las imágenes cargadas por el usuario
  if (files.length > 0) {
    const newImagesNames = await uploadFiles(files);
    images.push(...newImagesNames);
  }
  const imagesToSave = images.map((image) => {
    if (image.includes("http")) return image.split("/").pop() || "";
    return image;
  });

  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...resto,
      images: imagesToSave,
    },
  });
  const imagesUrls = data.images.map((image) => {
    if (image.includes("http")) return image;
    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  return { ...data, images: imagesUrls };
};

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await tesloApi<FileUploadResponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });
    return data.fileName;
  });
  const uploadedFileNames = await Promise.all(uploadPromises);
  return uploadedFileNames;
};
