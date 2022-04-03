/* eslint-disable */
import { Button,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        IconButton,
        Tooltip } from "@mui/material";
import { FaTrashAlt } from 'react-icons/fa';

import { BiSort } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import http from "../../service/api";

import * as C from './styled'

export default function Table({ data }) {
  const [renderData, setRenderData] = useState([])
  const [sortedField, setSortedField] = useState(null);
  const [toggleSort, setToggleSort] = useState(false)
  const [statusChange, setStatusChange] = useState(null)
  const [decisionRemoveRegister, setDecisionRemoveRegister] = useState(false)
  const [docNumberToBeRemoved, setDocNumberToBeRemoved] = useState('')

  async function handleClickChangeStatus(docNumber) {
    await http.changeStatus({ docNumber })
    setRenderData(renderData.map(item => {
      if (item.docNumber === docNumber) {
        return { ...item, blockList: !item.blockList, status: item.status === 'SIM' ? 'NÃO' : 'SIM' }
      }
      return item
    }))
  }

  async function handleClickRemoveRegister() {
    const res = await http.remove({ docNumber: docNumberToBeRemoved })
    setRenderData(renderData.filter(item => item.docNumber !== docNumberToBeRemoved))
    setDecisionRemoveRegister(false)
  }
  
  useEffect(() => {
    setRenderData(data
      .map(item => ({ ...item,
        status: item.blockList 
          ? 'SIM'
          : 'NÃO',
        type: item.type.toUpperCase()})))
  }, [data])
  
  if (sortedField !== null) {
    renderData.sort((a, b) => {
      setSortedField(null)
      setToggleSort(!toggleSort)
      if (toggleSort) return a[sortedField] > (b[sortedField]) ? -1 : 1
      return b[sortedField] > (a[sortedField]) ? -1 : 1
    });
  }

  function handleDecisionRemoveRegister(docNumber) {
    setDocNumberToBeRemoved(docNumber)
    setDecisionRemoveRegister(true);
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') return;
  }


  return (
    <C.Container>
      <table>
        <thead>
          <tr>
            <th>Tipo do Documento
              <Tooltip title='ordenar'>
                <IconButton
                  onClick={() => setSortedField('type')}
                >
                  <BiSort />
                </IconButton>
              </Tooltip>
            </th>
            <th>Número do Documento
              <Tooltip title='ordenar'>
                <IconButton
                  onClick={() => setSortedField('docNumber')}
                >
                  <BiSort/>
                </IconButton>
              </Tooltip>
            </th>
            <th>Está bloqueado?
            <Tooltip title='ordenar'>
                <IconButton
                  onClick={() => setSortedField('status')}
                >
                  <BiSort />
                </IconButton>
              </Tooltip>
            </th>
            <th>Alterar Bloqueio</th>
            <th>Excluir Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {renderData.map(({ _id, type, docNumber, blockList, status }) => (
            <tr key={_id}>
              <td>{type}</td>
              <td>{docNumber}</td>
              <td className={ status === 'SIM' ? 'red' : 'green' }>{status}</td>
              <td>
                <button 
                  onClick={() =>handleClickChangeStatus(docNumber)}
                  className='search--button'
                >
                  {blockList ? "Excluir" : "Incluir"}
                </button>
              </td>
              <td>
                <Tooltip title='deletar'>
                <IconButton onClick={() => handleDecisionRemoveRegister(docNumber)}>
                  <FaTrashAlt className='search--icon__trash' />
                </IconButton>
              </Tooltip></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
            open={decisionRemoveRegister}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Gerenciamento de cadastros"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText 
                id="alert-dialog-description"
              >
                Gostaria de remover o cadastro?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDecisionRemoveRegister(false)}>No</Button>
              <Button onClick={handleClickRemoveRegister} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    </C.Container>
  );
}


