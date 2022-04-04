import React from 'react';
import { render, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Search from '../components/search'

describe.only('Testes Register.js renderização dos elementos na tela', () => {
  beforeEach(() => {
    render(<Search />)
  })

  it('18 - Deve ter o o texto "cadastro cpf/cnpj" ', () => {
    const inputRegister = screen.getByTestId('search-input')
    const btnCadatrar = screen.getByRole('button', { name: 'Pesquisar' })
    userEvent.type(inputRegister, '')
    userEvent.click(btnCadatrar)
    expect(screen.getByTestId('alert')).toBeDefined();
    expect(screen.getByText('CPF/CNPJ inválido.')).toBeDefined()
  })
})