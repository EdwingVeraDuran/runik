import {
  createBrandService,
  deleteBrandService,
  readBrandsService,
  updateBrandService,
} from "@/features/product-brands/services/brandService";
import { ProductBrand } from "@/features/product-brands/types/brand";
import { useEffect, useState } from "react";

export function useBrands() {
  const [brands, setBrands] = useState<ProductBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function addBrand(brand: Omit<ProductBrand, "id" | "created_at">) {
    try {
      await createBrandService(brand);
      fetchBrands();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  async function fetchBrands() {
    try {
      setLoading(true);
      const data = await readBrandsService();
      setBrands(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateBrand(brand: Omit<ProductBrand, "created_at">) {
    try {
      await updateBrandService(brand.id, brand);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  async function deleteBrand(id: string) {
    try {
      await deleteBrandService(id);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error,
    addBrand,
    updateBrand,
    deleteBrand,
    refresh: fetchBrands,
  };
}
