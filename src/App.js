import './App.css';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import { MainPage } from './components/Home/main_page';
import { Pollution } from './components/Pollution/pollution';
import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <header className='logo'>
        <h2>PollutionTracker</h2>
        <nav className='navigation'>
          <Link className='linkText' to='/'>
            Home
          </Link>
        </nav>
      </header>
        <Routes>
          <Route exact path='/' element={<MainPage/>}></Route>
          <Route exact path='/pollution' element={<Pollution/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
