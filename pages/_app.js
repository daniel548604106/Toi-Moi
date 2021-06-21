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
import ViewPostModal from '../components/Global/ViewPostModal';
import Overlay from '../components/Global/Overlay';
import LikesListModal from '../components/Home/Feed/LikesListModal';
import InputBoxModal from '../components/Home/Feed/InputBoxModal';
import EditProfileImageModal from '../components/Profile/EditProfileImageModal';
import EditSummaryModal from '../components/Profile/EditSummaryModal';
import router from 'next/router';
import Cookies from 'js-cookie';
const App = ({ Component, pageProps }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const isLikesListOpen = useSelector((state) => state.post.isLikesListOpen);
  const isEditProfileImageOpen = useSelector(
    (state) => state.user.isEditProfileImageOpen
  );
  const isEditSummaryModalOpen = useSelector(
    (state) => state.profile.isEditSummaryModalOpen
  );
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );
  const isPostInputBoxOpen = useSelector(
    (state) => state.post.isPostInputBoxOpen
  );
  if (!isUserLoggedIn) return <Login />;
  return (
    <>
      {(isLikesListOpen ||
        isPostInputBoxOpen ||
        isViewPostModalOpen ||
        isEditProfileImageOpen ||
        isEditSummaryModalOpen) && (
        <Overlay>
          {isLikesListOpen && <LikesListModal />}
          {isPostInputBoxOpen && <InputBoxModal />}
          {isViewPostModalOpen && <ViewPostModal />}
          {isEditProfileImageOpen && <EditProfileImageModal />}
          {isEditSummaryModalOpen && <EditSummaryModal />}
        </Overlay>
      )}
      <Header />
      <main className="pt-[56px] md:pt-0">
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
