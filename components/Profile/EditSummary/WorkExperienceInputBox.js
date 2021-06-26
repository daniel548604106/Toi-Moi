import React, { useState, useEffect } from 'react';
import PeriodSelector from './PreriodSelector';
import { apiPostWorkExperienceSummary } from '../../../api/index';
import Loader from '../../Global/Loader';
import router from 'next/router';
const WorkExperienceInputBox = ({ setActiveBox }) => {
  const handleCancel = () => {
    setActiveBox(0);
  };
  const [available, setAvailable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company_name: '',
    job_title: '',
    still_working: true,
    location: '',
    description: '',
    period: {
      start_year: '',
      start_month: '',
      end_year: '',
      end_month: ''
    },
    set_public: true
  });
  const handleInputChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
    console.log(newExperience);
  };

  const handleSave = async () => {
    if (!available) return;
    try {
      setLoading(true);
      const res = await apiPostWorkExperienceSummary(
        router.query.id,
        newExperience
      );
      setLoading(false);
      setActiveBox(0);
      console.log('send', res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const {
      period: { start_year, start_month, end_year, end_month },
      still_working,
      company_name
    } = newExperience;

    if (company_name === '') return setAvailable(false);
    if (!start_year || !start_month) return setAvailable(false);
    if (!still_working && (!end_year || !end_month)) return setAvailable(false);
    setAvailable(true);
  }, [newExperience]);

  return (
    <div className="">
      <form className="space-y-2 ">
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          name="company_name"
          onChange={(e) => handleInputChange(e)}
          placeholder="* Company"
        />
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          name="job_title"
          onChange={(e) => handleInputChange(e)}
          placeholder="Job Title"
        />
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          name="location"
          onChange={(e) => handleInputChange(e)}
          placeholder="City"
        />
        <input
          className="border min-h-[100px] p-3 w-full rounded-md "
          type="text"
          name="description"
          onChange={(e) => handleInputChange(e)}
          placeholder="Description"
        />
      </form>
      <PeriodSelector
        setNewExperience={setNewExperience}
        newExperience={newExperience}
      />
      <div className="my-5 flex items-center">
        <button
          onClick={() => handleSave()}
          className={`rounded-md  bg-gray-100 p-2 w-full flex items-center justify-center ${
            available && 'bg-main text-secondary cursor-pointer'
          }  ${!available && 'cursor-not-allowed'}`}
        >
          {isLoading ? <Loader /> : 'Save'}
        </button>
        <button
          onClick={() => handleCancel()}
          className="rounded-md w-[200px] p-2 ml-[10px] border flex items-center justify-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceInputBox;
