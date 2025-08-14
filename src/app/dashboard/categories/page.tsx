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
  const { categories, loading, error, addCategory, updateCategory, deleteCategory, refresh } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    addCategory({ name });
    setName("");
  }

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-[600] flex flex-col gap-4">
          <SectionTitle title="Categorías" />
          <form className="flex justify-between items-center gap-4" onSubmit={handleSubmit}>
            <Input
              id="name"
              type="text"
              placeholder="Nombre de categoría"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button>Crear categoría</Button>
          </form>
          <CategoryList>{categories.map(category => (<CategoryTile key={category.id} category={category} onUpdate={updateCategory} />))}</CategoryList>
        </div>
      </section>
    </>
  );
}
