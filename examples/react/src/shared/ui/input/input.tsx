import { memo } from 'react'

import { InputRoot } from './styles'

export namespace Input {
  export interface Props {
    label?: string
    value?: string
    type?: 'color' | 'text'
    onChange?(value: string): void
  }
}

export const Input = memo<Input.Props>(
  ({ type = 'text', label, value, onChange }) => (
    <InputRoot>
      {label && <span>{label}</span>}

      <input
        type={type}
        value={value}
        onChange={onChange && (e => onChange(e.target.value))}
      />
    </InputRoot>
  ),
)
