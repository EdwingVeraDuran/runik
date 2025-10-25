"use client";

import SectionTitle from "@/components/dashboard/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandList from "@/features/product-brands/components/BrandList";
import BrandTile from "@/features/product-brands/components/BrandTile";
import { useBrands } from "@/features/product-brands/hooks/useBrands";
import React, { useState } from "react";

export default function BrandsPage() {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { brands, isLoading, error, addBrand, updateBrand, deleteBrand } =
    useBrands();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    try {
      setIsCreating(true);
      await addBrand({ name: trimmedName });
      setName("");
    } catch {
      // El hook ya maneja el estado de error
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (brandId: string) => {
    const shouldDelete = window.confirm(
      "Eliminaras esta marca y no podras recuperarla. Deseas continuar?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteBrand(brandId);
    } catch {
      // El hook ya maneja el estado de error
    }
  };

  return (
    <section className="flex justify-center">
      <div className="flex w-full max-w-[600px] flex-col gap-6">
        <SectionTitle title="Marcas" />

        <form
          className="flex items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            id="brand-name"
            type="text"
            placeholder="Nombre de marca"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creando..." : "Crear marca"}
          </Button>
        </form>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="px-3 py-2 text-sm text-muted-foreground">
            Cargando marcas...
          </p>
        ) : brands.length ? (
          <BrandList>
            {brands.map((brand) => (
              <BrandTile
                key={brand.id}
                brand={brand}
                onUpdate={updateBrand}
                onDelete={handleDelete}
              />
            ))}
          </BrandList>
        ) : (
          <p className="rounded-md border border-dashed border-muted-foreground/40 px-6 py-8 text-center text-sm text-muted-foreground">
            Aun no tienes marcas. Agrega la primera para comenzar.
          </p>
        )}
      </div>
    </section>
  );
}
