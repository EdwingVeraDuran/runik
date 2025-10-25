import {
  createProductService,
  deleteProductService,
  readProductsService,
  updateProductService,
} from "@/features/products/services/productService";
import {
  Product,
  ProductDraft,
  ProductUpdatePayload,
} from "@/features/products/types/product";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseProductsOptions = {
  query?: string;
};

export function useProducts({ query = "" }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const captureError = useCallback((err: unknown) => {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Ocurrio un error con los productos.";
    setError(message);
    return message;
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await readProductsService();
      setProducts(data);
    } catch (err) {
      captureError(err);
    } finally {
      setIsLoading(false);
    }
  }, [captureError]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(
    async (payload: ProductDraft) => {
      setError(null);

      try {
        const created = await createProductService(payload);
        setProducts((prev) => [created, ...prev]);
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const updateProduct = useCallback(
    async (payload: ProductUpdatePayload) => {
      setError(null);

      try {
        const updated = await updateProductService(payload);
        setProducts((prev) =>
          prev.map((product) =>
            product.id === updated.id ? updated : product,
          ),
        );
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setError(null);

      try {
        await deleteProductService(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const filteredProducts = useMemo(() => {
    if (!query) {
      return products;
    }

    const normalizedQuery = query.toLowerCase();

    return products.filter((product) =>
      [
        product.code,
        product.name,
        product.categoryName,
        product.brandName,
      ]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [products, query]);

  const clearError = useCallback(() => setError(null), []);

  return {
    products: filteredProducts,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refresh: fetchProducts,
    clearError,
    totalProducts: products.length,
  };
}
