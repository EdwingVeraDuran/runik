import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductBrand } from "@/features/product-brands";

type ProductBrandFieldProps = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  brands: ProductBrand[];
};

export default function ProductBrandField({
  value,
  onValueChange,
  brands,
}: ProductBrandFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccione marca" />
      </SelectTrigger>
      <SelectContent>
        {brands.map((brand) => (
          <SelectItem key={brand.id} value={brand.name}>
            {brand.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
