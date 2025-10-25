"use client";

import SectionTitle from "@/components/dashboard/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryList from "@/features/product-categories/components/CategoryList";
import CategoryTile from "@/features/product-categories/components/CategoryTile";
import { useCategories } from "@/features/product-categories/hooks/useCategories";
import React, { useState } from "react";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { categories, isLoading, error, addCategory, updateCategory, deleteCategory } =
    useCategories();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    try {
      setIsCreating(true);
      await addCategory({ name: trimmedName });
      setName("");
    } catch {
      // El hook ya maneja el estado de error
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const shouldDelete = window.confirm(
      "Eliminaras esta categoria y no podras recuperarla. Deseas continuar?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteCategory(categoryId);
    } catch {
      // El hook ya maneja el estado de error
    }
  };

  return (
    <section className="flex justify-center">
      <div className="flex w-full max-w-[600px] flex-col gap-6">
        <SectionTitle title="Categorias" />

        <form
          className="flex items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            id="category-name"
            type="text"
            placeholder="Nombre de categoria"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creando..." : "Crear categoria"}
          </Button>
        </form>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="px-3 py-2 text-sm text-muted-foreground">
            Cargando categorias...
          </p>
        ) : categories.length ? (
          <CategoryList>
            {categories.map((category) => (
              <CategoryTile
                key={category.id}
                category={category}
                onUpdate={updateCategory}
                onDelete={handleDelete}
              />
            ))}
          </CategoryList>
        ) : (
          <p className="rounded-md border border-dashed border-muted-foreground/40 px-6 py-8 text-center text-sm text-muted-foreground">
            Aun no tienes categorias. Agrega la primera para comenzar.
          </p>
        )}
      </div>
    </section>
  );
}
