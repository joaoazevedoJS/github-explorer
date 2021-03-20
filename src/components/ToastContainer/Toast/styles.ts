import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface AlertProps {
  type: 'success' | 'error' | 'warn' | 'info';
}

const alertTypes = {
  info: css`
    background: #afdcf0;
    border-color: #5ac1ed;
    color: #1694ca;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  warn: css`
    background: #fffaf9;
    color: #dbc500;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.li)<AlertProps>`
  list-style: none;
  padding: 16px;

  width: 100%;

  display: grid;
  align-items: center;
  grid-template-columns: 30px 1fr;
  grid-gap: 16px;

  position: relative;

  border-radius: 8px 0 0 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  div {
    span {
      font-size: 1.12rem;
      font-weight: bold;
    }

    p {
      margin-top: 8px;
      font-size: 0.87rem;
      line-height: 145%;
      width: 85%;
    }
  }

  ${props => alertTypes[props.type]}

  & + li {
    margin-top: 16px;
  }

  svg {
    font-size: 30px;
    margin-right: 16px;
  }

  button {
    border: none;
    background: transparent;

    position: absolute;
    right: 0;
    top: 16px;
  }
`;
