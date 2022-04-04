import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Radio, RadioGroup,
    TextField, Alert, Snackbar} from "@mui/material";

import http from "../../service/api";
import Table from "../table";

import * as S from './../sharedStyled' 


export default function Register() {
  const [valueRadioButton, setValueRadioButton] = useState("all");
  const [valueCheckButton, setValueCheckButton] = useState(false);
  const [fifthWarning, setFifthWarning] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [docs, setDocs] = useState([])
  const [flag, setFlag] = useState(false)


  async function registerData(data) {
    setDocs(await http.search(data));
    setFlag(true)
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      blockList: valueCheckButton,
      type: valueRadioButton,
      docNumber: inputValue,
    };
    registerData(data);
    setFlag(false)
    setInputValue('')
    return "";
  }
  
  useEffect(() => {
    if (docs.length === 0 && flag) {
      setFifthWarning(true)
    }
  }, [flag, docs])


  function handleClose(event, reason) {
    if (reason === 'clickaway') return;
    setFifthWarning(false);
  }

  return (
    <S.Container>
      <fieldset>
        <legend id='search--legend'>Pesquisa CPF/CNPJ</legend>
        <S.Form onSubmit={(e) => handleSubmit(e)}>
          <div className="search--control">
            <div className='search--control--checkbox'>
              <RadioGroup
                row
                value={valueRadioButton}
                onChange={(e) => setValueRadioButton(e.target.value)}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Todos" 
                />
                <FormControlLabel 
                  value="cpf" 
                  control={<Radio/>} 
                  label="CPF" 
                />
                <FormControlLabel 
                  value="cnpj"
                  control={<Radio/>}
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
              data-testid='search-input'
              className="search--input"
              id="outlined-textarea"
              label="CPF/CNPJ"
              placeholder="CPF/CNPJ somente números"
              multiline
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              size="small"
            />
          </div>
          <Button
            variant="contained"
            type="submit"
          >
            Pesquisar
          </Button>
        </S.Form>
      </fieldset>
      <Table data={docs}/>
      <Snackbar
          open={fifthWarning}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert
          data-testid='alert'
          onClose={handleClose}
          severity={ "info"}
          sx={{ width: '100%' }}
        >
          "Nenhum resultado encontrado na busca"
        </Alert>
      </Snackbar>
    </S.Container>
  );
}
