import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductCategory } from "@/features/product-categories/types/category";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CategoryTileProps = {
  category: ProductCategory;
  onUpdate: (category: Omit<ProductCategory, "created_at">) => void;
};

export default function CategoryTile({ category, onUpdate }: CategoryTileProps) {

  const [name, setName] = useState<string>(category.name);
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
        id: category.id,
        name: name,
      });
    } else {
      setIsEditing(false);
      setName("");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setName(category.name);
    }
  }

  return (
    <div className="flex justify-between items-center p-2 px-6 gap-4">
      {isEditing ? (
        <Input ref={inputRef} id="name_input" type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown} />
      ) : (
        <span>{category.name}</span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={() => setIsEditing(true)}>Editar</DropdownMenuItem>
          <DropdownMenuItem>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  );
}
