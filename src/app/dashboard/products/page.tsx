"use client";

import SectionTitle from "@/components/dashboard/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateProductDialog from "@/features/products/components/dialogs/CreateProductDialog";
import ProductsTable from "@/features/products/components/ProductsTable";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useState } from "react";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const {
    products,
    isLoading,
    error,
    clearError,
    refresh,
    totalProducts,
    addProduct,
  } = useProducts({ query });

  return (
    <section className="flex justify-center">
      <div className="flex w-full max-w-[900px] flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <SectionTitle title="Productos" />
          <span className="text-sm text-muted-foreground">
            {totalProducts} productos totales
          </span>
        </div>

        <div className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Input
              id="product-search"
              type="search"
              placeholder="Buscar por codigo, nombre, categoria o marca"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuery("");
                clearError();
                void refresh();
              }}
            >
              Limpiar
            </Button>
            <CreateProductDialog onCreate={addProduct} />
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {isLoading ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">
              Cargando productos...
            </p>
          ) : (
            <ProductsTable products={products} />
          )}
        </div>
      </div>
    </section>
  );
}
