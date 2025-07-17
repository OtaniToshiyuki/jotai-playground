import { InputHTMLAttributes } from "react";

interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const LabeledInput = ({ label, ...props }: LabeledInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input id={label} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
    </div>
  );
};
