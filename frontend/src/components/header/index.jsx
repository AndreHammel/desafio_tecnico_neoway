import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo_cpf_cnpj_crop.png'
import * as C from './styled'

import http from '../../service/api';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

const opt = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Header() {
  const [info, setInfo] = useState([])
  const [open, setOpen] = useState(false);
  const [nova, setNova] = useState('')



  const handleClose = () => {
    setOpen(false);
  };

  async function handleLog() {
    setInfo(await http.log())
    setOpen(true);
  }

  useEffect( () => {
    setNova(info.stats?.reduce((acc, rec) => {
      return acc + `url: ${ rec.url } => acessos: ${rec.count}\n`
    }, `\nData: ${new Date(info?.data?.date).toLocaleDateString('pt-br', opt)}
        Tempo servidor ativo: ${info?.data?.uptime.toFixed(3)} segundos\n\n `))
  }, [info])

  return (
    <C.Container>
      <img src={logo} alt='logo'/>
      <button onClick={ handleLog }>Informações do Servidor</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="parent-modal-title">Dados do Servidor</h2>
          <p id="parent-modal-description">
            <span style={{ whiteSpace: "pre-line"}}>{nova}</span>
          </p>
        </Box>
      </Modal>
    </C.Container>
  );
}
