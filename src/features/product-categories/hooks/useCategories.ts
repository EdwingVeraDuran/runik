import {
  createCategoryService,
  deleteCategoryService,
  readCategoriesService,
  updateCategoryService,
} from "@/features/product-categories/services/categoryService";
import {
  CategoryDraft,
  CategoryUpdatePayload,
  ProductCategory,
} from "@/features/product-categories/types/category";
import { useCallback, useEffect, useState } from "react";

const sortCategoriesByName = (items: ProductCategory[]) =>
  [...items].sort((a, b) => a.name.localeCompare(b.name));

export function useCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const captureError = useCallback((err: unknown) => {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Ocurrio un error con las categorias.";
    setError(message);
    return message;
  }, []);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await readCategoriesService();
      setCategories(sortCategoriesByName(data));
    } catch (err) {
      captureError(err);
    } finally {
      setIsLoading(false);
    }
  }, [captureError]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = useCallback(
    async (payload: CategoryDraft) => {
      setError(null);

      try {
        const created = await createCategoryService(payload);
        setCategories((prev) => sortCategoriesByName([...prev, created]));
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const updateCategory = useCallback(
    async ({ id, name }: CategoryUpdatePayload) => {
      setError(null);

      try {
        const updated = await updateCategoryService(id, { name });
        setCategories((prev) =>
          sortCategoriesByName(
            prev.map((category) =>
              category.id === updated.id ? updated : category,
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

  const deleteCategory = useCallback(
    async (id: string) => {
      setError(null);

      try {
        await deleteCategoryService(id);
        setCategories((prev) =>
          prev.filter((category) => category.id !== id),
        );
      } catch (err) {
        captureError(err);
        throw err;
      }
    },
    [captureError],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    categories,
    isLoading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refresh: fetchCategories,
    clearError,
  };
}
