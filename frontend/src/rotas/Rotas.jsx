import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from '../pages/pageCadastro.jsx'


const Rotas = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout/>}>
        <Route path='cadastro' element={<Cadastro/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default Rotas