import {
  createCategoryService,
  readCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} from "@/features/product-categories/services/categoryService";
import { ProductCategory } from "@/features/product-categories/types/category";
import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Category
  async function addCategory(
    category: Omit<ProductCategory, "id" | "created_at">
  ) {
    try {
      await createCategoryService(category);
      fetchCategories();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  // Read Categories
  async function fetchCategories() {
    try {
      setLoading(true);
      const data = await readCategoriesService();
      setCategories(data);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // Update Category
  async function updateCategory(category: Omit<ProductCategory, "created_at">) {
    try {
      await updateCategoryService(category.id, category);
      fetchCategories();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  // Delete Category
  async function deleteCategory(id: string) {
    try {
      await deleteCategoryService(id);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refresh: fetchCategories,
  };
}
