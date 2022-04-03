import styled from 'styled-components';

export const Container = styled.div`
  width: 980px;
  margin: auto;
  // background: red;
  margin-top: 30px;
  table {
    border-collapse:collapse;
    th:nth-of-type(1) {
      width: 200px;
      border-bottom: 2px solid black;
    }
    th:nth-of-type(2) {
      width: 250px;
      border-bottom: 2px solid black;
    }
    th:nth-of-type(3) {
      width: 200px;
      border-bottom: 2px solid black;
    }
    th:nth-of-type(4) {
      width: 165px;
      border-bottom: 2px solid black;
    }
    th:nth-of-type(5) {
      width: 165px;
      border-bottom: 2px solid black;
    }
    td:nth-of-type(5),
    td:nth-of-type(4),
    td:nth-of-type(3) {
      text-align: center;
      font-weight: bold;
    }
    
    tr:nth-of-type(even) {
      background: #F2EFEB;
    }

    .red {
      color: var(--red-900);
    }
    .green {
      color: var(--green);
    }
  }

  .search--button {
    background: blue;
    width: 40%;
    border: none;
    border-radius: 5px;
    height: 28px;
    font-size: 16px;]
    padding: 3px;
    cursor: pointer;
    background: none;
    border: 1px solid var(--blue); 
    font-weight: bold;
  }

  .search--button:hover {
    background: var(--blue);
    color: var(--white)
  }
  

  .search--icon__trash {
    color: var(--red-100);
    :hover {
      color: var(--red-700);
    }
  }
  th button {
    color: var(--blue);
  }

`;
