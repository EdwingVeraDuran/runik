import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  CategoryUpdatePayload,
  ProductCategory,
} from "@/features/product-categories/types/category";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CategoryTileProps = {
  category: ProductCategory;
  onUpdate: (category: CategoryUpdatePayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function CategoryTile({
  category,
  onUpdate,
  onDelete,
}: CategoryTileProps) {
  const [name, setName] = useState(category.name);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setName(category.name);
      return;
    }

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [category.name, isEditing]);

  const closeEditor = () => {
    setIsEditing(false);
    setName(category.name);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      closeEditor();
      return;
    }

    if (trimmedName === category.name) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onUpdate({ id: category.id, name: trimmedName });
      setIsEditing(false);
    } catch {
      setName(category.name);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSave();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeEditor();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(category.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-2">
      {isEditing ? (
        <Input
          ref={inputRef}
          id={`category-${category.id}`}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (!isSaving) {
              void handleSave();
            }
          }}
          disabled={isSaving}
        />
      ) : (
        <span className="truncate">{category.name}</span>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Acciones de categoria"
            disabled={isSaving || isDeleting}
          >
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenuItem
            disabled={isSaving || isDeleting}
            onSelect={() => setIsEditing(true)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            disabled={isSaving || isDeleting}
            onSelect={() => {
              void handleDelete();
            }}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
