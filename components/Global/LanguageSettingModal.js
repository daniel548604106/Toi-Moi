import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { toggleLanguageOpen } from '../../redux/slices/globalSlice';
import Link from 'next/link';
import router from 'next/router';
const LanguageSettingModal = () => {
  const [currentLanguage, setCurrentLanguage] = useState(router.locale);
  const dispatch = useDispatch();
  const languages = [
    {
      name: 'English',
      id: 'en'
    },
    {
      name: '繁體中文',
      id: 'zh-tw'
    }
  ];
  return (
    <div className="relative w-full max-w-[400px] rounded-lg p-5 bg-secondary text-secondary">
      <h2 className="text-2xl font-semibold mb-3">Language Setting</h2>
      <span
        onClick={() => dispatch(toggleLanguageOpen())}
        className="cursor-pointer absolute top-3 right-3 rounded-full p-2 bg-secondary text-secondary"
      >
        <XIcon className="h-6" />
      </span>
      <form className="space-y-2">
        {languages.map((language) => (
          <div className="flex items-center justify-between text-lg">
            <label for={language.name}>{language.name}</label>
            <input
              onChange={(e) => setCurrentLanguage(e.target.value)}
              type="radio"
              value={language.id}
              name="language"
              id={language.id}
              checked={currentLanguage === language.id}
            />
          </div>
        ))}
        <div className="flex items-center justify-end mt-3">
          <Link href="/" locale={currentLanguage}>
            <button
              onClick={() => dispatch(toggleLanguageOpen())}
              className=" rounded-lg px-4 p-2 bg-main text-white"
            >
              Save
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LanguageSettingModal;
