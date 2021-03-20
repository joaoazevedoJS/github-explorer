import styled from 'styled-components';

export const Container = styled.div`
  max-width: 920px;

  h1 {
    font-size: 3rem;
    color: #3a3a3a;
    max-width: 490px;
    line-height: 125%;

    margin-top: 80px;
  }

  form {
    margin-top: 40px;

    display: grid;
    grid-template-columns: 200px 1fr 200px;

    div + div {
      margin-left: 10px;
    }
  }
`;
