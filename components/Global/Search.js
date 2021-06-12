import React, { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { apiSearchRequest } from '../../api/index';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import SearchResultList from './SearchResultList';
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
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
    if (searchText === '') {
      setSearchResult(null);
    } else {
      search();
    }
  }, [searchText]);
  return (
    <div className="hidden fixed top-0 rounded-md left-0 z-50 bg-white shadow-md p-5 pb-2 max-w-[350px]">
      <div className="flex items-center ">
        <ChevronLeftIcon className="mr-[30px] h-5 cursor-pointer" />
        <form
          action=""
          className="flex items-center ml-[10px] border rounded-full p-[5px] bg-gray-100"
        >
          <SearchIcon className="h-5 w-5 text-gray-600" />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="hidden lg:inline-flex outline-none bg-gray-100 ml-[5px]"
            type="search"
            placeholder="search"
          />
        </form>
      </div>
      <div className="max-h-[500px] overflow-y-auto py-[10px]">
        {searchResult &&
          searchResult.map((result) => (
            <SearchResultList
              key={result.username}
              username={result.username}
              name={result.name}
              profileImage={result.profileImage}
            />
          ))}
        <SearchResultList Icon={SearchIcon} searchText={searchText} />
      </div>
    </div>
  );
};

export default Search;
