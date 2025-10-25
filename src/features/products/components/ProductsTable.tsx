import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/features/products/types/product";
import ProductRow from "@/features/products/components/ProductRow";

type ProductsTableProps = {
  products: Product[];
  emptyMessage?: string;
};

export default function ProductsTable({
  products,
  emptyMessage = "No hay productos para mostrar.",
}: ProductsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Codigo</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead className="text-right">Compra</TableHead>
          <TableHead className="text-right">Venta</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length ? (
          products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="px-4 py-6 text-center text-sm text-muted-foreground"
            >
              {emptyMessage}
            </td>
          </tr>
        )}
      </TableBody>
      <TableCaption>Total: {products.length} productos</TableCaption>
    </Table>
  );
}
