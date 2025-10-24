import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductBrand } from "@/features/product-brands/types/brand";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type BrandTileProps = {
  brand: ProductBrand;
  onUpdate: (category: Omit<ProductBrand, "created_at">) => void;
};

export default function BrandTile({ brand: brand, onUpdate }: BrandTileProps) {
  const [name, setName] = useState<string>(brand.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isEditing]);

  const handleSave = () => {
    if (name.trim() !== "") {
      setIsEditing(false);
      onUpdate({
        id: brand.id,
        name: name,
      });
    } else {
      setIsEditing(false);
      setName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setName(brand.name);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 px-6 gap-4">
      {isEditing ? (
        <Input
          ref={inputRef}
          id="name_input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span>{brand.name}</span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
