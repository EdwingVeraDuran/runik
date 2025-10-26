import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCategory } from "@/features/product-categories";

type ProductCategoryFieldProps = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  categories: ProductCategory[];
};

export default function ProductCategoryField({
  value,
  onValueChange,
  categories,
}: ProductCategoryFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder="Seleccione categoría" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={cat.name}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
