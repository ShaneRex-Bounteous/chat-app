import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { ApolloProvider } from "@apollo/client"
import { client } from './graphql/client';
import { SnackbarProvider } from "notistack"
import Home from './pages/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} maxSnack={3} preventDuplicate>
        <BrowserRouter>
          <Routes>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default App;
