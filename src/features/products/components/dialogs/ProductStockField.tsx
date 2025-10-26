import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Box } from "lucide-react";

type ProductStockFieldProps = {
  value: string | undefined;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductStockField({
  value,
  placeholder,
  onChange,
}: ProductStockFieldProps) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Box />
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>Unidades</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
