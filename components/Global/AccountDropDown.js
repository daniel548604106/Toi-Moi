import { useSelector, useDispatch } from 'react-redux';
import { LogoutIcon, CogIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { setUserLogout } from '../../redux/slices/userSlice';
import Image from 'next/image';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import useDarkMode from '../../hooks/useDarkMode';
import genderAvatar from '../../utils/genderAvatar';
const AccountPopup = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const userInfo = useSelector((state) => state.user.userInfo);
  const email = useSelector((state) => state.user.userInfo.email);
  const router = useRouter();

  const dispatch = useDispatch();
  const handleUserLogout = (email) => {
    // Set userEmail for autocomplete in login email field
    Cookie.set('userEmail', email);
    Cookie.remove('token');
    dispatch(setUserLogout());
    router.push('/');
  };

  return (
    <div>
      <div
        onClick={() => router.push(`/${userInfo.username}`)}
        className="cursor-pointer flex items-center rounded-md hover:bg-gray-100  p-2"
      >
        <Image
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="ml-[10px] text-left">
          <span className="font-semibold">{userInfo.name}</span>
          <p className="text-xs text-gray-600">Check out your profile</p>
        </div>
      </div>
      <hr className="my-[10px]" />
      <div className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md p-2">
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-gray-100">
            <CogIcon className="h-6" />
          </span>
          <span className="ml-[10px]">Settings and Privacy</span>
        </div>
        <ChevronRightIcon className="h-6 text-gray-600" />
      </div>
      <div>
        <span onClick={() => setTheme(colorTheme)}>Light Mode</span>
      </div>
      <div
        onClick={() => handleUserLogout(email)}
        className="cursor-pointer flex items-center hover:bg-gray-100 rounded-md p-2"
      >
        <span className="p-2 rounded-full bg-gray-100">
          <LogoutIcon className="h-6" />
        </span>
        <span className="ml-[10px]">Logout</span>
      </div>
    </div>
  );
};

export default AccountPopup;
