import { TableCell, TableRow } from "@/components/ui/table";
import { Product } from "@/features/products/types/product";
import { formatCurrency } from "@/features/products/lib/formatCurrency";

type ProductRowProps = {
  product: Product;
};

export default function ProductRow({ product }: ProductRowProps) {
  return (
    <TableRow>
      <TableCell>{product.code}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.categoryName || "—"}</TableCell>
      <TableCell>{product.brandName || "—"}</TableCell>
      <TableCell className="text-right">
        {formatCurrency(product.buyPrice)}
      </TableCell>
      <TableCell className="text-right">
        {formatCurrency(product.sellPrice)}
      </TableCell>
      <TableCell className="text-right">{product.stock}</TableCell>
    </TableRow>
  );
}
