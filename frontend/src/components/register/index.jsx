import React, { useState } from "react";
import { Alert, Button, Checkbox, FormControlLabel, Radio,
    RadioGroup, Snackbar, TextField } from "@mui/material";

import http from "../../service/api";
import validateCNPJ from "../../utils/validateDocNumberCNPJ";
import validateCPF from "../../utils/validateDocNumberCPF";
import validateInputValue from "../../utils/validateInputValue";

import * as S from './../sharedStyled' 

export default function Register() {
  const [valueRadioButton, setValueRadioButton] = useState("cpf");
  const [valueCheckButton, setValueCheckButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [firstWarning, setFirstWarning] = useState(false);
  const [secondWarning, setSecondWarning] = useState(false);
  const [thirdWarning, setThirdWarning] = useState(false);
  const [fourthWarning, setfFourthWarning] = useState(false);

  async function registerData(data) {
    const responseStatus = await http.register(data);
    responseStatus === 400 
      ? setThirdWarning(true)
      : setfFourthWarning(true)
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateInputValue(inputValue)) {
      setFirstWarning(true);
      return "";
    }
    const resultValidation =
      valueRadioButton === "cpf"
        ? validateCPF(inputValue)
        : validateCNPJ(inputValue);
    if (!resultValidation) {
      setSecondWarning(true);
      return "";
    }
    const data = {
      docNumber: inputValue,
      blockList: valueCheckButton,
      type: valueRadioButton,
    };
    registerData(data)
    setInputValue('')
    setValueCheckButton(false)
    return "";
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') return;
    setFirstWarning(false);
    setSecondWarning(false);
    setThirdWarning(false)
    setfFourthWarning(false)
  }
  
  return (
    <S.Container>
      <fieldset>
        <legend id='register--legend'>Cadastro CPF/CNPJ</legend>
        <S.Form onSubmit={(e) => handleSubmit(e)}>
          <div className="register--control">
            <div className='register--control--checkbox'>
              <RadioGroup
                row
                value={valueRadioButton}
                onChange={(e) => setValueRadioButton(e.target.value)}
              >
                <FormControlLabel 
                  data-testid='radiobox-cpf'
                  value="cpf"
                  control={<Radio />}
                  label="CPF" 
                />
                <FormControlLabel
                  value="cnpj"
                  control={<Radio />}
                  label="CNPJ"
                />
              </RadioGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Bloqueado"
                value={inputValue}
                onChange={() => setValueCheckButton(!valueCheckButton)}
              />
            </div>
            <TextField
              data-testid="register-input"
              className="register--input"
              id="outlined-textarea"
              label="CPF/CNPJ"
              placeholder="CPF/CNPJ somente números"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              size="small"
              multiline={false}
              row={1}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
          >
            Cadastrar
          </Button>
        </S.Form>
        <Snackbar
            data-testid='snackbar'
            open={firstWarning || secondWarning || thirdWarning || fourthWarning}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert
            data-testid='alert'
            onClose={handleClose}
            severity={ fourthWarning ? "success" : "error"}
            sx={{ width: '100%' }}
          >
            { firstWarning 
              ? 'CPF/CNPJ deve conter somente número.' 
              : secondWarning 
                ? 'CPF/CNPJ inválido.' 
                : thirdWarning
                  ? 'CPF/CNPJ já cadastrado.'
                  : 'CPF/CNPJ cadastrado com sucesso.'}
          </Alert>
        </Snackbar>
      </fieldset>
    </S.Container>
  );
}
