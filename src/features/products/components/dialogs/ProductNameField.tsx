import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Package } from "lucide-react";

type ProductNameFieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductNameField({
  value,
  onChange,
}: ProductNameFieldProps) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Package />
      </InputGroupAddon>
      <InputGroupInput placeholder="Nombre" value={value} onChange={onChange} />
    </InputGroup>
  );
}
