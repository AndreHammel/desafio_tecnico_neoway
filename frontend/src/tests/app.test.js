import React from 'react';
import { render, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Testes App.js renderização dos elementos na tela', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('1 - Deve renderizar o logo com alt igual a "logo"', () => {
    const imgLogo = screen.getByAltText('logo')
    expect(imgLogo).toBeDefined();
  })

  it('2 - Deve renderizar o botão com o texto "Informações do Servido"', () => {
    const btnInfoServer = screen.getByRole('button', { name: /informações do servidor/i })
    expect(btnInfoServer).toBeDefined();
  })

  it('3 - Deve renderizar o botão com o texto "Cadastrar"', () => {
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i })
    expect(btnRegister).toBeDefined();
  })

  it('4 - Deve renderizar o botão com o texto "Pesquisar"', () => {
    const btnSearch = screen.getByRole('button', { name: /pesquisar/i })
    expect(btnSearch).toBeDefined();
  })

  it('5 - Deve renderizar duas caixas de inputs', () => {
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)
  })

  it('6 - Deve renderizar duas caixas do tipo radio button', () => {
    const radioGroups = screen.getAllByRole('radiogroup')
    expect(radioGroups).toHaveLength(2)
  })

  it('7 - Deve rendedizar duas caixas do tipo checkbox', () => {
    const checkboxBtn = screen.getAllByRole('checkbox')
    expect(checkboxBtn).toHaveLength(2);
  })

  it('8 - Deve ter oito textos "CPF"', () => {
    const textCPF = screen.getAllByText(/cpf/i)
    expect(textCPF).toHaveLength(8);
  })

  it('9 - Deve ter oito textos "CNPJ"', () => {
    const textCNPJ = screen.getAllByText(/cnpj/i)
    expect(textCNPJ).toHaveLength(8);
  })

  it('10 - Deve ter três textos "bloqueado" ', () => {
    const textBloqueado = screen.getAllByText(/bloqueado/i)
    expect(textBloqueado).toHaveLength(3);
  })

  it('11 - Deve ter o texto "todos"', () => {
    const textTodos = screen.getByText('Todos')
    expect(textTodos).toBeDefined();
  })

  it('12 - Deve ter o elemente "table" na tela', () => {
    const tableElement = screen.getByRole('table')
    expect(tableElement).toBeDefined();
  })

  it('13 - Deve ter o o texto "Tipo de Documento" que o texto da header da tabela', () => {
    const headerTableText = screen.getByText(/tipo do documento/i)
    expect(headerTableText).toBeDefined();
  })

  it('14 - Deve ter o o texto "Número do Documento" que o texto da header da tabela', () => {
    const headerTableText = screen.getByText(/número do documento/i)
    expect(headerTableText).toBeDefined();
  })

  it('15 - Deve ter o o texto "Está Bloqueado" que o texto da header da tabela', () => {
    const headerTableText = screen.getByText(/está bloqueado/i)
    expect(headerTableText).toBeDefined();
  })

  it('16 - Deve ter o o texto "Alterar Bloqueio" que o texto da header da tabela', () => {
    const headerTableText = screen.getByText(/alterar bloqueio/i)
    expect(headerTableText).toBeDefined();
  })

  it('17 - Deve ter o o texto "Excluir cadastro" que o texto da header da tabela', () => {
    const headerTableText = screen.getByText(/excluir cadastro/i)
    expect(headerTableText).toBeDefined();
  })

})