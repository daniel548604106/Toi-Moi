import '../styles/globals.css';
import '../styles/LoaderSpinner.css';
import '../styles/LoaderBounce.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components

import LoaderSpinner from '../components/Global/LoaderSpinner';
import Login from '../components/Login/Index';
import Header from '../components/Global/Header';

const Overlay = dynamic(() => import('../components/Global/Overlay'), {
  loading: () => <LoaderSpinner />
});

// Modals
const ViewPostModal = dynamic(
  () => import('../components/Global/ViewPostModal'),
  {
    loading: () => <LoaderSpinner />
  }
);
const EditSummaryModal = dynamic(
  () => import('../components/Profile/EditSummaryModal'),
  {
    loading: () => <LoaderSpinner />
  }
);
const LikesListModal = dynamic(
  () => import('../components/Home/Feed/LikesListModal'),
  {
    loading: () => <LoaderSpinner />
  }
);
const CreateRoomModal = dynamic(
  () => import('../components/Home/Feed/Room/CreateRoomModal/Index'),
  {
    loading: () => <LoaderSpinner />
  }
);
const EditProfileImageModal = dynamic(
  () => import('../components/Profile/EditProfileImageModal'),
  {
    loading: () => <LoaderSpinner />
  }
);
const LanguageSettingModal = dynamic(
  () => import('../components/Global/LanguageSettingModal'),
  {
    loading: () => <LoaderSpinner />
  }
);

import InputBoxModal from '../components/Home/Feed/InputBoxModal';
import Cookies from 'js-cookie';

// Redux Persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { setUserLogout } from '../redux/slices/userSlice';

let persistor = persistStore(store);

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const isLikesListOpen = useSelector((state) => state.post.isLikesListOpen);
  const isLanguageOpen = useSelector((state) => state.global.isLanguageOpen);
  const isEditProfileImageOpen = useSelector(
    (state) => state.user.isEditProfileImageOpen
  );
  const isCreateRoomOpen = useSelector(
    (state) => state.global.isCreateRoomOpen
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

  // Log user out if no token is found
  const token = Cookies.get('token');
  if (!token) {
    dispatch(setUserLogout());
  }

  // Set loading on router change
  // useEffect(() => {
  //   router.events.on('routeChangeStart', setLoading(true));
  //   router.events.on('routeChangeComplete', setLoading(false));
  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', setLoading(false));
  //   };
  // }, []);
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const allowedRoutes = router.pathname === '/reset/password';
  const isModalOpen =
    isLikesListOpen ||
    isPostInputBoxOpen ||
    isViewPostModalOpen ||
    isEditProfileImageOpen ||
    isEditSummaryModalOpen ||
    isCreateRoomOpen ||
    isLanguageOpen;

  if (!isUserLoggedIn && !allowedRoutes) return <Login />;
  return (
    <>
      <Head>
        <title>Toi & Moi</title>
        <meta
          name="description"
          content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isModalOpen && (
        <Overlay>
          {isLikesListOpen && <LikesListModal />}
          {isPostInputBoxOpen && <InputBoxModal />}
          {isViewPostModalOpen && <ViewPostModal />}
          {isEditProfileImageOpen && <EditProfileImageModal />}
          {isEditSummaryModalOpen && <EditSummaryModal />}
          {isLanguageOpen && <LanguageSettingModal />}
          {isCreateRoomOpen && <CreateRoomModal />}
        </Overlay>
      )}
      {!allowedRoutes && <Header />}
      {loading && (
        <div className="fixed bg-black bg-opacity-20 top-0 left-0 w-screen h-screen z-50 flex items-center justify-center">
          <LoaderSpinner />
        </div>
      )}
      <main
        className={`${
          isModalOpen && 'overflow-hidden'
        } pt-[110px] md:pt-[70px] h-screen primary dark:bg-primary`}
      >
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
