import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { Route, Routes } from 'react-router-dom'
import CategoryDisplay from './Pages/CategoryDisplay/CategoryDisplay'
import DailyDeal from './Components/DailyDeal/DailyDeal'
import Orders from './Pages/Orders/Orders'
import FlashSale from './Components/FlasSale/FlashSale'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Admin/>} />
        <Route path='/categorydisplay/:productId' element={<CategoryDisplay/>} />
        <Route path='/dailydeal' element={<DailyDeal/>} />
        <Route path='/flashsale' element={<FlashSale/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>
    </>
  )
}

export default App