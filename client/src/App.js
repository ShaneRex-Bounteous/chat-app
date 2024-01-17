import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { client } from './graphql/client';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

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
