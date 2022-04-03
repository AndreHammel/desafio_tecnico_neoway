import styled from 'styled-components';

export const Container = styled.div`
  height: 120px;
  background: var(--blue);
  display: flex;
  justify-content: space-between;
  

  button {
    font-size: 16px;
    font-weight: bold;
    height: 50px;
    align-self: center;
    margin-right: 30px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    
    :hover {
      filter: brightness(85%);
    }
  }
`;
