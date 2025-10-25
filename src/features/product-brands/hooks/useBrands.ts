import {
  createBrandService,
  deleteBrandService,
  readBrandsService,
  updateBrandService,
} from "@/features/product-brands/services/brandService";
import {
  BrandDraft,
  BrandUpdatePayload,
  ProductBrand,
} from "@/features/product-brands/types/brand";
import { useCallback, useEffect, useState } from "react";

const sortBrandsByName = (items: ProductBrand[]) =>
  [...items].sort((a, b) => a.name.localeCompare(b.name));

export function useBrands() {
  const [brands, setBrands] = useState<ProductBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const captureError = useCallback((err: unknown) => {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Ocurrio un error con las marcas.";
    setError(message);
    return message;
  }, []);

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await readBrandsService();
      setBrands(sortBrandsByName(data));
    } catch (err) {
      captureError(err);
    } finally {
      setIsLoading(false);
    }
  }, [captureError]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const addBrand = useCallback(
    async (payload: BrandDraft) => {
      setError(null);

      try {
        const created = await createBrandService(payload);
        setBrands((prev) => sortBrandsByName([...prev, created]));
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const updateBrand = useCallback(
    async ({ id, name }: BrandUpdatePayload) => {
      setError(null);

      try {
        const updated = await updateBrandService(id, { name });
        setBrands((prev) =>
          sortBrandsByName(
            prev.map((brand) =>
              brand.id === updated.id ? updated : brand,
            ),
          ),
        );
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const deleteBrand = useCallback(
    async (id: string) => {
      setError(null);

      try {
        await deleteBrandService(id);
        setBrands((prev) => prev.filter((brand) => brand.id !== id));
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    brands,
    isLoading,
    error,
    addBrand,
    updateBrand,
    deleteBrand,
    refresh: fetchBrands,
    clearError,
  };
}
