"use client";

import SectionTitle from "@/components/dashboard/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SuppliersPage() {
  return (
    <section className="flex justify-center">
      <div className="flex w-full max-w-[900px] flex-col gap-6">
        <SectionTitle title="Proveedores" />
        <div className="flex items-center justify-between gap-3">
          <Input
            id="search-supplier"
            type="text"
            placeholder="Buscar proveedor"
          />
          <Button>Crear Proveedor</Button>
        </div>
      </div>
    </section>
  );
}
