import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'
import Private from './components/Private.js';
import AddProduct from './components/AddProduct.js';
import ProductList from './components/ProductList.js';
import UpdateProduct from './components/UpdateProduct.js';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter >
      <Nav />
    <Routes>
       
        <Route element={<Private/>}> 

       <Route path="/" element={<ProductList/>} />
       <Route path="/add" element={<AddProduct/>} />
       <Route path="/update/:id" element={<UpdateProduct/>} />
       <Route path="/logout" element={<h1> Logout Component</h1>} />
       <Route path="/profile" element={<h1>Profile Component</h1>} />
     
     </Route>

       <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>}/>
      
       </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  );
}

export default App;
