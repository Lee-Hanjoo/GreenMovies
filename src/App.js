import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import '../src/css/reset.css';
import '../src/css/common.css';
import Header from './component/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';
import List from './pages/List';
import Error from './pages/Error';
import store from './state/store'
import { useEffect, useState } from 'react';

function App() {

  let {dataCtrl} = store();

  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dataCtrl({t:'all'});  
      // setMovies(res.data.results);
    };
    
    fetchData();
  }, [dataCtrl]);
  

  return (
    <div className='main'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/detail' element={<Detail />}/>
          <Route path='/list' element={<List  />}/>
          <Route path='/*' element={<Error />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
