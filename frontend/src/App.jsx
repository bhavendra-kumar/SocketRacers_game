import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './components/Game'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
