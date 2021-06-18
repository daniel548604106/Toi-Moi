import React, { useState, useEffect, useRef } from 'react';
import { apiSearchRequest } from '../../api/index';
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline';
import SearchListItem from './SearchListItem';
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearchResultShow, setSearchResultShow] = useState(false);
  const searchInputRef = useRef(null);

  const handleInputFocus = () => {
    setSearchResultShow(true);
  };

  const search = async () => {
    try {
      console.log(searchText);
      const res = await apiSearchRequest(searchText);
      setSearchResult(res.data);
      console.log(res.data, res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSearchResultShow) {
      searchInputRef.current.focus();
    }
  }, [isSearchResultShow]);

  useEffect(() => {
    if (searchText === '') {
      setSearchResult(null);
    } else {
      search();
    }
  }, [searchText]);
  return (
    <div className=" max-w-[350px]">
      <div className="flex items-center rounded-full bg-gray-100 pl-2">
        <SearchIcon className="h-5 ml-[10px]" />
        <input
          type="text"
          onFocus={() => handleInputFocus()}
          placeholder="Search"
          className="text-sm bg-gray-100 rounded-full p-3 pl-2 outline-none"
        />
      </div>
      {isSearchResultShow && (
        <div className="fixed top-0 left-0 w-[350px] rounded-md bg-white p-3 shadow-xl">
          <div className="flex items-center w-full">
            <span
              onClick={() => setSearchResultShow(false)}
              className="p-3 rounded-full cursor-pointer bg-gray-100"
            >
              <ChevronLeftIcon className="h-6 " />
            </span>
            <div className="flex flex-1 ml-[20px] items-center rounded-full bg-gray-100 pl-2">
              <SearchIcon className="h-5 ml-[10px]" />
              <input
                type="text"
                value={searchText}
                ref={searchInputRef}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="text-sm w-full bg-gray-100 rounded-full p-3 pl-2 outline-none"
              />
            </div>
          </div>
          <div className=" max-h-[500px] overflow-y-auto py-[10px]">
            {searchResult &&
              searchResult.map((result) => (
                <SearchListItem
                  key={result.username}
                  username={result.username}
                  name={result.name}
                  profileImage={result.profileImage}
                />
              ))}
          </div>
          <div className="flex hover:bg-gray-100 rounded-md cursor-pointer items-center p-[10px]">
            <SearchIcon className=" rounded-full w-[40px] h-[40px] p-2 bg-blue-600 text-white" />
            <p className="ml-[10px] font-medium text-blue-600">
              搜尋 {searchText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
