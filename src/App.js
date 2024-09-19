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

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dataCtrl();  // dataCtrl을 호출해서 데이터를 받아옴
      setMovies(res.data.results);   // 받아온 데이터 중에서 results 배열을 상태에 저장
    };
    
    fetchData();  // 컴포넌트가 렌더링될 때 fetchData 실행
  }, [dataCtrl]);
  

  return (
    <div className='main'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home movies={movies} />}/>
          <Route path='/detail' element={<Detail movies={movies}/>}/>
          <Route path='/list' element={<List movies={movies} />}/>
          <Route path='/*' element={<Error />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
