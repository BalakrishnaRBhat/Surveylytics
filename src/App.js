import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard } from './Pages/Dashboard';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { CreateForm } from './Pages/CreateForm';
import { Provider } from 'react-redux';
import store from './store/store';
import Responses from './Pages/Responses';
import ViewResponses from './Pages/ViewResponses';
import { Submitted } from './Pages/Submitted';
import { Preview } from './Pages/Preview'

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#1de9b6",
    },
    error: {
      main: "#d50000"
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
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/create' component={CreateForm} />
            <Route exact path='/response/:name/:id' component={Responses} />
            <Route exact path='/viewResponses/:id' component={ViewResponses} />
            <Route exact path='/submitted' component={Submitted} />
            <Route exact path='/preview' component={Preview} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
