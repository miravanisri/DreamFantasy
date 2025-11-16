import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import PickPlayer from './Pages/PickPlayer'
import PickCaptain from './Pages/PickCaptain'
import Myteam from './Pages/Myteam'


const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/pickplayer' element={<PickPlayer></PickPlayer>}></Route>
      <Route path='/pickcaptain' element={<PickCaptain></PickCaptain>}></Route>
      <Route path='/myteam' element={<Myteam></Myteam>}></Route>
    </Routes>
  )
}

export default App
