import { FC, ReactNode } from 'react'

import { CardBody, CardHeader, CardRoot } from './styles'

export namespace Card {
  export interface Props {
    title?: string
    children?: ReactNode
  }
}

export const Card: FC<Card.Props> = ({ title, children }) => (
  <CardRoot>
    {title && <CardHeader>{title}</CardHeader>}
    {children && <CardBody>{children}</CardBody>}
  </CardRoot>
)
