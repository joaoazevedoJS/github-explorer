import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;

    display: flex;
    align-items: center;

    transition: transform 0.2s;

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-decoration: none;

      flex: 1;
      margin: 0 16px;

      strong {
        font-size: 1.25rem;
        color: #3d3d4d;
      }

      p {
        font-size: 1.12rem;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    & + li {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }

  button {
    width: 224px;
    margin-top: 24px;

    padding: 16px 0;
    background: #04d361;
    border-radius: 8px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;
