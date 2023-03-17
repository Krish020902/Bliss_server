import logo from './logo.svg';
import './App.css';
import { useSchemeContext } from './context/context';
import Navbar from './components/Navbar';
import Slider from './components/Slider';

function App() {
  // const {temp} = useSchemeContext();
  return (
    <div className="App">
    {/* <> */}
    <Navbar/>
    <div className='sliderStyle'>
      <Slider/>
    </div>
    {/* </> */}
    temp
      
    </div>
  );
}

export default App;
