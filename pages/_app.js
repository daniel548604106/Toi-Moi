import '../styles/globals.css';
import Header from '../components/Global/Header';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../components/Login/Index';
import LanguageSettingModal from '../components/Global/LanguageSettingModal';
import ViewPostModal from '../components/Global/ViewPostModal';
import Overlay from '../components/Global/Overlay';
import LikesListModal from '../components/Home/Feed/LikesListModal';
import InputBoxModal from '../components/Home/Feed/InputBoxModal';
import EditProfileImageModal from '../components/Profile/EditProfileImageModal';
import EditSummaryModal from '../components/Profile/EditSummaryModal';
import router from 'next/router';
import Cookies from 'js-cookie';

// Redux Persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { setUserLogout } from '../redux/slices/userSlice';

let persistor = persistStore(store);

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const isLikesListOpen = useSelector((state) => state.post.isLikesListOpen);
  const isLanguageOpen = useSelector((state) => state.global.isLanguageOpen);
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

  const token = Cookies.get('token');
  if (!token) {
    dispatch(setUserLogout());
  }

  const allowedRoutes = router.pathname === '/reset/password';
  if (!isUserLoggedIn && !allowedRoutes) return <Login />;
  return (
    <>
      {(isLikesListOpen ||
        isPostInputBoxOpen ||
        isViewPostModalOpen ||
        isEditProfileImageOpen ||
        isEditSummaryModalOpen ||
        isLanguageOpen) && (
        <Overlay>
          {isLikesListOpen && <LikesListModal />}
          {isPostInputBoxOpen && <InputBoxModal />}
          {isViewPostModalOpen && <ViewPostModal />}
          {isEditProfileImageOpen && <EditProfileImageModal />}
          {isEditSummaryModalOpen && <EditSummaryModal />}
          {isLanguageOpen && <LanguageSettingModal />}
        </Overlay>
      )}
      {!allowedRoutes && <Header />}
      <main className="pt-[50px] md:pt-0 primary dark:bg-primary">
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
