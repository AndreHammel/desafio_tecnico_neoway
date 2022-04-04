import React from 'react';
import { render, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Register from '../components/register'

describe.only('Testes Register.js renderização dos elementos na tela', () => {
  beforeEach(() => {
    render(<Register />)
  })

  it('18 - Deve ter o o texto "cadastro cpf/cnpj" ', () => {
    const inputRegister = screen.getByTestId('register-input')
    const btnCadatrar = screen.getByRole('button', { name: 'Cadastrar' })
    userEvent.type(inputRegister, '111')
    userEvent.click(btnCadatrar)
    expect(screen.getByTestId('alert')).toBeDefined();
    expect(screen.getByText('CPF/CNPJ inválido.')).toBeDefined()
  })
})