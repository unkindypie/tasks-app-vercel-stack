import { useField, useFormikContext } from 'formik';
import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
}

export const InputField = (props: InputProps) => {
  const [field, { error }, { setError }] = useField({
    id: props.id,
    name: props.name,
  });
  const { submitCount } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    setError('');
  };

  return (
    <div className="py-2 flex flex-col">
      {props.label && (
        <label htmlFor={field.name} className="">
          {props.label}
        </label>
      )}
      <input
        {...props}
        id={field.name}
        {...field}
        value={field.value ?? props.value ?? ''}
        onChange={props.onChange || handleChange}
        className="h-8 p-4 rounded-md text-black placeholder-gray-500"
      />
      {error && submitCount > 0 && (
        <p className="mt-1 text-red-200 ">
          {error[0].toUpperCase()}
          {error.slice(1)}
        </p>
      )}
    </div>
  );
};
