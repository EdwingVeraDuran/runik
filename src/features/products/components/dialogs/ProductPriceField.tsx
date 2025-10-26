import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { DollarSign } from "lucide-react";

type ProductPriceFieldProps = {
  value: string | undefined;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductPriceField({
  value,
  placeholder,
  onChange,
}: ProductPriceFieldProps) {
  return (
    <InputGroup>
      <InputGroupAddon>
        <DollarSign />
      </InputGroupAddon>
      <InputGroupInput
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>COP</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
