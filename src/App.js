import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import '../src/css/reset.css';
import '../src/css/common.css';
import Header from './component/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import { useRef, useState } from 'react';

function App() {

  return (
    <div className='main'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/detail' element={<Detail />}/>
          <Route path='/search' element={<Search />}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
