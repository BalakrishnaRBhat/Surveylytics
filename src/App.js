import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Dashboard } from './Pages/Dashboard';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { CreateForm } from './Pages/CreateForm';
import { Provider } from 'react-redux';
import store from './store/store';
// import { ResponsePage } from './Pages/ResponsePage';
import Responses from './Pages/Responses';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#1de9b6",
    },
    error: {
      main: "#c62828"
    },
    background: {
      default: '#fff',
    },
  },
})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/create' component={CreateForm} />
            <Route exact path='/response/:id' component={Responses} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
