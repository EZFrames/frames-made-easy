import { TextField } from "@mui/material";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField = ({ id, label, value, onChange, placeholder }: InputFieldProps) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
    />
  );
};

export default InputField;
