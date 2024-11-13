import './App.css';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import '../src/css/reset.css';
import '../src/css/common.css';
import '../src/css/media.css';
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
  
  // 680 아래로 리사이즈 비율
  // useEffect(() => {
  //   const resize = () => {
  //     const width = window.innerWidth;
  //     const minWidth = 680;
  //     let body = document.getElementsByTagName('body')[0];
  //     if (width < minWidth) {
  //       body.style.zoom = width / minWidth;
  //     } else {
  //       body.style.zoom = 1;
  //     }
  //   };

  //   // 페이지 로드 후 첫 번째 zoom 조정
  //   resize();
  //   // resize 이벤트 리스너 등록
  //   window.addEventListener('resize', resize);

  //   // 컴포넌트 언마운트 시 이벤트 리스너 정리
  //   return () => {
  //     window.removeEventListener('resize', resize);
  //   };
  // }, [])

  

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
