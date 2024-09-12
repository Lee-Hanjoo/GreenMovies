import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import '../src/css/reset.css';
import '../src/css/common.css';
import Header from './component/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';
import {  useEffect, useState } from 'react';
import List from './pages/List';
import Error from './pages/Error';

function App() {

  const [sub, setSub] = useState('home')

  return (
    <div className='main'>
      <Router>
        <Header setSub={setSub}/>
        <Routes>
          <Route path='/' element={<Home sub={sub} />}/>
          <Route path='/detail' element={<Detail />}/>
          <Route path='/list' element={<List sub={sub} />}/>
          <Route path='/*' element={<Error />}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
