import styled from 'styled-components'

export const CardRoot = styled.div`
  background-color: var(--tg-theme-secondary-bg-color);
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow-x: auto;
`

export const CardHeader = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`
export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow-x: auto;
`
