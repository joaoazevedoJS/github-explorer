import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 210px;
  height: 70px;
  background: #04d361;
  border-radius: 0 5px 5px 0;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#04d361')};
  }
`;
