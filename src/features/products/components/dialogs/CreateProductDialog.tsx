import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBrands } from "@/features/product-brands";
import { useCategories } from "@/features/product-categories";
import ProductBrandField from "@/features/products/components/dialogs/ProductBrandField";
import ProductCategoryField from "@/features/products/components/dialogs/ProductCategoryField";
import ProductCodeField from "@/features/products/components/dialogs/ProductCodeField";
import ProductNameField from "@/features/products/components/dialogs/ProductNameField";
import ProductPriceField from "@/features/products/components/dialogs/ProductPriceField";
import ProductStockField from "@/features/products/components/dialogs/ProductStockField";
import { ProductDraft } from "@/features/products/types/product";
import { useState } from "react";

type CreateProductDialogProps = {
  onCreate: (product: ProductDraft) => void;
};

export default function CreateProductDialog({
  onCreate,
}: CreateProductDialogProps) {
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const product: ProductDraft = {
        code: code,
        name: name,
        buyPrice: Number(buyPrice),
        sellPrice: Number(sellPrice),
        categoryId: categories.find((cat) => cat.name === category)?.id ?? "",
        brandId: brands.find((bra) => bra.name === brand)?.id ?? "",
        stock: Number(stock),
      };
      onCreate(product);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="default">Crear Producto</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Producto</DialogTitle>
            <DialogDescription>
              Ingrese los datos de su producto.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            <ProductCodeField
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <ProductNameField
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ProductCategoryField
              value={category}
              onValueChange={(e) => setCategory(e)}
              categories={categories}
            />
            <ProductBrandField
              value={brand}
              onValueChange={(e) => setBrand(e)}
              brands={brands}
            />
            <ProductPriceField
              value={buyPrice}
              placeholder="Precio Compra"
              onChange={(e) => setBuyPrice(e.target.value)}
            />
            <ProductPriceField
              value={sellPrice}
              placeholder="Precio Venta"
              onChange={(e) => setSellPrice(e.target.value)}
            />
            <ProductStockField
              value={stock}
              placeholder="10"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Crear
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
