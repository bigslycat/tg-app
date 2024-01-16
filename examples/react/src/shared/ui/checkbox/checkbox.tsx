import { memo } from 'react'

import { CheckboxRoot } from './styles'

export namespace Checkbox {
  export interface Props {
    checked?: boolean
    onChange?(checked: boolean): void
    label?: string
  }
}

export const Checkbox = memo<Checkbox.Props>(({ checked, onChange, label }) => (
  <CheckboxRoot>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange && (e => onChange?.(e.target.checked))}
    />
    <span>{label}</span>
  </CheckboxRoot>
))
