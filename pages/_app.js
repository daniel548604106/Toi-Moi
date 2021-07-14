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
import * as ga from '../lib/gtag';

// Components

import Login from '../components/Login/Index';
import Header from '../components/Global/Header';
import PostSkeletonLoader from '../components/Global/Loader/PostSkeletonLoader';
import LoaderSpinner from '../components/Global/LoaderSpinner';
import Notification from '../components/Global/Notification';
import { setNotification } from '../redux/slices/globalSlice';
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
  const { isLikesListOpen } = useSelector((state) => state.post);
  const { isLanguageOpen, notification } = useSelector((state) => state.global);
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

  const handleRouteChange = (url, { shallow }) => {
    ga.pageView(url);
    setLoading(true);
  };
  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 3000);
  }, [notification]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  // Track user geolocation

  useEffect(() => {
    const successfulLookup = (position) => {
      const { latitude, longitude } = position.coords;
      ga.event({
        action: 'send',
        category: 'geolocation',
        label: 'geolocation',
        value: [latitude, longitude]
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successfulLookup, console.log);
    }
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

        <meta name="keywords" content="Toi&Moi social-media friend post" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system."
        />
        <meta name="theme-color" content="#eb7f82" />
        <meta property="fb:app_id" content="4937468222991458" />
        <meta
          property="og:title"
          content="Toi & Moi | Brand New Social Media Platform"
        />
        <meta property="og:url" content="https://toi-moi.herokuapp.com" />
        <meta
          property="og:image"
          content="https://cdn01.pinkoi.com/product/ZD5QQsTg/0/800x0.jpg"
        />
        <link rel="apple-touch-icon" href="../public/favicon.ico" />
        <link rel="icon" href="../public/favicon.ico" />
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
      {notification && <Notification notification={notification} />}
      {loading ? (
        <div className="pt-[100px] text-gray-600 text-center">
          <PostSkeletonLoader />
          <span className="">載入中...</span>
        </div>
      ) : (
        <main
          className={`${
            router.pathname.includes('messages') ? 'pt-56px' : 'pt-[110px]'
          }  md:pt-[56px] h-screen primary dark:bg-primary`}
        >
          <Component {...pageProps} />
        </main>
      )}
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
