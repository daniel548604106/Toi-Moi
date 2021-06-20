import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import _ from 'lodash';
const yearRange = _.range(2021, 1960);
const monthRange = _.range(1, 12);
const PeriodSelector = ({ newExperience, setNewExperience }) => {
  const [checked, setChecked] = useState(true);

  // Start
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  // End
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  useEffect(() => {
    setNewExperience({ ...newExperience, still_working: checked });
  }, [checked]);
  useEffect(() => {
    setNewExperience({
      ...newExperience,
      period: {
        start_year: startYear,
        end_year: endYear,
        start_month: startMonth,
        end_month: endMonth
      }
    });
  }, [startYear, endYear, startMonth, endMonth]);

  return (
    <div>
      <div className="my-2 flex items-center justify-between">
        <p className="text-lg font-semibold ">Period</p>
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => setChecked(!checked)}
            checked={checked}
            className="w-[20px] h-[20px]"
          />
          <p className="ml-[10px] font-semibold text-sm">
            Currently working here
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>From</span>
        <div className="flex items-center">
          <button className="group w-[100px] relative flex text-sm justify-center items-center p-2 px-4 rounded-md border text-gray-600 ">
            {startYear ? startYear : 'Year'}
            <ChevronDownIcon className="h-6" />
            <div className="group-focus:block focus:hidden hidden  right-0 bg-white transform translate-y-full bottom-0 w-[100px] border rounded-md absolute h-[150px] overflow-y-auto">
              {yearRange.map((year) => (
                <p
                  onClick={() => setStartYear(year)}
                  className="hover:bg-gray-100 py-1 text-md"
                  key={year}
                >
                  {year}
                </p>
              ))}
            </div>
          </button>
          <button className="group ml-[10px] justify-center  w-[100px] relative flex text-sm items-center p-2 px-4 rounded-md border text-gray-600 ">
            {startMonth ? startMonth : 'Month'}
            <ChevronDownIcon className="h-6" />
            <div className="group-focus:block hidden right-0 bg-white transform translate-y-full bottom-0 w-[100px] border rounded-md absolute h-[150px] overflow-y-auto">
              {monthRange.map((month) => (
                <p
                  onClick={() => setStartMonth(month)}
                  className="hover:bg-gray-100 py-1 text-md"
                  key={month}
                >
                  {month}
                </p>
              ))}
            </div>
          </button>
        </div>
        {!checked && (
          <>
            <span>Until</span>
            <div className="flex items-center">
              <button className="group  focus:outline-none w-[100px] relative flex text-sm justify-center items-center p-2 px-4 rounded-md border text-gray-600 ">
                {endYear ? endYear : 'Year'}
                <ChevronDownIcon className="h-6" />
                <div className="hidden  group-focus:block right-0 bg-white transform translate-y-full bottom-0 w-[100px] border rounded-md absolute h-[150px] overflow-y-auto">
                  {yearRange.map((year) => (
                    <p
                      onClick={() => setEndYear(year)}
                      className="hover:bg-gray-100 py-1 text-md"
                      key={year}
                    >
                      {year}
                    </p>
                  ))}
                </div>
              </button>
              <button className="group focus:outline-none ml-[10px] justify-center  w-[100px] relative flex text-sm items-center p-2 px-4 rounded-md border text-gray-600 ">
                {endMonth ? endMonth : 'Month'}
                <ChevronDownIcon className="h-6" />
                <div className="hidden group-focus:block right-0 bg-white transform translate-y-full bottom-0 w-[100px] border rounded-md absolute h-[150px] overflow-y-auto">
                  {monthRange.map((month) => (
                    <p
                      onClick={() => setEndMonth(month)}
                      className="hover:bg-gray-100 py-1 text-md"
                      key={month}
                    >
                      {month}
                    </p>
                  ))}
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PeriodSelector;
