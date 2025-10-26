import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Barcode } from "lucide-react";

type ProductCodeFieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductCodeField({
  value,
  onChange,
}: ProductCodeFieldProps) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Barcode />
      </InputGroupAddon>
      <InputGroupInput placeholder="Código" value={value} onChange={onChange} />
    </InputGroup>
  );
}
