import '../styles/globals.css';
import Header from '../components/Global/Header';
import Search from '../components/Global/Search';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from '../components/Login/Index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

const App = ({ Component, pageProps }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  if (!isUserLoggedIn) return <Login />;
  return (
    <>
      <Header />
      <Search />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    //Make sure every page has the login state
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App pageProps={pageProps} Component={Component} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
