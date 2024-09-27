import './App.css';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import '../src/css/reset.css';
import '../src/css/common.css';
import Header from './component/Header';
import store from './state/store'
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Error from './pages/Error';
import SearchList from './pages/SearchList';
import List from './pages/List';

function App() {

  const [tab, setTab] = useState('trend');
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
        <Header tab={tab} setTab={setTab} />
        <Routes>
          <Route path='/' element={<Home tab={tab} setTab={setTab} />}/>
          <Route path='/list' element={<List tab={tab} setTab={setTab} />}/>
          <Route path='/detail/:id' element={<Detail />}/>
          <Route path='/search' element={<SearchList  />}/>
          <Route path='/*' element={<Error />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
