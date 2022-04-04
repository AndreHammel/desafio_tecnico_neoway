import styled from 'styled-components';

export const Container = styled.div`
  width: 980px;
  margin: auto;
  margin-top: 40px;

  fieldset {
    padding: 10px;
    border: 1px solid var(--blue);
    border-radius: 10px;
  }
  #register--legend,
  #search--legend {
    font-size: 21px;
    padding: 0 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;

  button {
    background: var(--blue);

    :hover {
      filter: brightness(85%);
    }
  }

  .register--control,
  .search--control {
    display: flex;
    width: 100%;
    

    .register--control--checkbox,
    .search--control--checkbox {
      width: 50%;
      display: flex;
    }

    .search--input,
    .register--input {
      width: 40%;
      height: 30px;
      margin-left: 40px;
      font-size: 40px;
    }
  }
`;