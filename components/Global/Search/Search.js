import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline';
import {
  apiPostKeywordSearch,
  apiGetRecentSearch,
  apiSearchRequest
} from '../../../api/index';
import SearchListItem from './SearchListItem';
import SearchHistoryItem from './SearchHistoryItem';
import router from 'next/router';
import * as ga from '../../../lib/ga';
const Search = ({ t }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchHistory, setSearchHistory] = useState(null);
  const [isSearchResultShow, setSearchResultShow] = useState(false);
  const searchInputRef = useRef(null);

  const handleInputFocus = () => {
    setSearchResultShow(true);
  };

  const search = async () => {
    try {
      const res = await apiSearchRequest(searchText);
      setSearchResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchHistory = async () => {
    try {
      const res = await apiGetRecentSearch();
      setSearchHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordSearch = async (e) => {
    if (e.target.name === 'search' && e.key !== 'Enter') return;
    router.push(`/search/top?q=${searchText}`);
    setSearchText('');
    setSearchResultShow(false);
    ga.event({
      action: 'search',
      params: {
        search_term: router.query.q
      }
    });
    try {
      const res = await apiPostKeywordSearch(searchText);
      await getSearchHistory();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchHistory();
  }, []);
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
    <div className="group ">
      <div className="flex items-center rounded-full bg-button text-primary ">
        <span onClick={() => handleInputFocus()} className="p-2  rounded-full ">
          <SearchIcon className="h-5" />
        </span>
        <input
          type="text"
          onFocus={() => handleInputFocus()}
          placeholder={t('search')}
          className="text-sm hidden max-w-[160px]  lg:max-w-[200px] lg:block bg-button text-primary rounded-full p-3 pl-2 outline-none"
        />
      </div>
      {isSearchResultShow && (
        <div className="fixed z-50 top-0 h-full sm:h-auto  left-0 w-full sm:max-w-[350px] rounded-md bg-secondary text-secondary p-3 shadow-xl">
          <div className="flex items-center w-full sm:pl-3">
            <span
              onClick={() => setSearchResultShow(false)}
              className="p-3 rounded-full cursor-pointer bg-button text-primary"
            >
              <ChevronLeftIcon className="h-6 " />
            </span>
            <div className="flex flex-1 ml-[20px] items-center rounded-full bg-button text-primary pl-2">
              <SearchIcon className="h-5 ml-[10px]" />
              <input
                type="text"
                value={searchText}
                ref={searchInputRef}
                name="search"
                onKeyDown={(e) => handleKeywordSearch(e)}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="text-sm w-full bg-button text-primary rounded-full p-3 pl-2 outline-none"
              />
            </div>
          </div>
          <div className=" max-h-[500px] overflow-y-auto py-[10px]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Search</h2>
              <span className="cursor-pointer hover:bg-gray-100 text-main text-sm p-2 rounded-md">
                Edit History
              </span>
            </div>
            {searchResult
              ? searchResult.map((result) => (
                  <SearchListItem
                    setSearchResultShow={setSearchResultShow}
                    gender={result.gender}
                    key={result.username}
                    username={result.username}
                    name={result.name}
                    profileImage={result.profileImage}
                  />
                ))
              : searchHistory.map((history) => (
                  <SearchHistoryItem
                    setSearchResultShow={setSearchResultShow}
                    searchHistory={searchHistory}
                    setSearchHistory={setSearchHistory}
                    key={history._id}
                    history={history}
                  />
                ))}
          </div>
          {searchText !== '' && (
            <div
              onClick={(e) => handleKeywordSearch(e)}
              className="flex hover:bg-gray-100 rounded-md cursor-pointer items-center p-2 py-1"
            >
              <SearchIcon className=" rounded-full w-[40px] h-[40px] p-2  bg-main text-white" />
              <p className="ml-[15px] font-medium text-main">
                {t('search')} {searchText}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
