"use client";

import SectionTitle from "@/components/dashboard/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryList from "@/features/product-categories/components/CategoryList";
import CategoryTile from "@/features/product-categories/components/CategoryTile";
import { useBrands } from "@/features/product-brands/hooks/useBrands";
import React, { useState } from "react";

export default function BrandsPage() {
  const [name, setName] = useState("");
  const {
    brands,
    loading,
    error,
    addBrand,
    updateBrand,
    deleteBrand,
    refresh,
  } = useBrands();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    addBrand({ name });
    setName("");
  };

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-[600] flex flex-col gap-4">
          <SectionTitle title="Marcas" />
          <form
            className="flex justify-between items-center gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              id="name"
              type="text"
              placeholder="Nombre de marca"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button>Crear marca</Button>
          </form>
          <CategoryList>
            {brands.map((brand) => (
              <CategoryTile
                key={brand.id}
                category={brand}
                onUpdate={updateBrand}
              />
            ))}
          </CategoryList>
        </div>
      </section>
    </>
  );
}
