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
import Overlay from '../components/Global/Overlay';
import LikesListModal from '../components/Home/Feed/LikesListModal';
const App = ({ Component, pageProps }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const isLikesListOpen = useSelector((state) => state.post.isLikesListOpen);
  if (!isUserLoggedIn) return <Login />;
  return (
    <>
      {isLikesListOpen && (
        <Overlay>
          <LikesListModal />
        </Overlay>
      )}
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
