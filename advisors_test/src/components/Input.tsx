import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  placeholder,
  defaultValue,
  required = true,
  ...rest
}) => {
  return (
    <div>
      <label className="labelInput" htmlFor={id || name}>
        {label}
      </label>
      <input
        className="input"
        type="text"
        id={id || name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        {...rest}
      />
    </div>
  )
}

export default Input
