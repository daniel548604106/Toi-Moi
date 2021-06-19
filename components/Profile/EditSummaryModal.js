import React, { useState, useEffect } from 'react';
import AddNewButton from './EditSummary/AddNewButton';
import { XIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { setSummaryModalShow } from '../../redux/slices/profileSlice';
import HomeTownInputBox from './EditSummary/HomeTownInputBox';
import RelationshipStatusInputBox from './EditSummary/RelationshipStatusInputBox';
import WorkExperienceInputBox from './EditSummary/WorkExperienceInputBox';
import CurrentCityInputBox from './EditSummary/CurrentCityInputBox';
import EducationInputBox from './EditSummary/EducationInputBox';
const EditSummaryModal = () => {
  const dispatch = useDispatch();
  const [activeBox, setActiveBox] = useState([]);
  const handleSetActive = (idx) => {
    if (activeBox === []) {
      return setActiveBox([idx]);
    }
    setActiveBox([...activeBox, idx]);
  };
  useEffect(() => {
    console.log(activeBox);
  }, [activeBox]);
  return (
    <div className="relative bg-white rounded-md flex flex-col  w-full max-w-[600px] max-h-screen  sm:max-h-[70vh] h-full">
      <div className="flex p-3 border-b items-center justify-center">
        <h2 className="text-xl font-semibold">Edit Summary</h2>
      </div>
      <span
        onClick={() => dispatch(setSummaryModalShow(false))}
        className="absolute cursor-pointer top-[8px] right-[8px] p-2 rounded-full bg-gray-100"
      >
        <XIcon className="h-4" />
      </span>
      <div className="p-5 flex-1 overflow-y-auto">
        <div>
          <p className="text-gray-600 text-sm">
            Your info will be set public, and will not be sent to your feed.
          </p>
        </div>

        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Work Experience</h2>
          {activeBox.includes(1) ? (
            <WorkExperienceInputBox />
          ) : (
            <div onClick={() => handleSetActive(1)}>
              <AddNewButton title="Add New Work Location" />
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Education</h2>
          {activeBox.includes(2) ? (
            <EducationInputBox />
          ) : (
            <div onClick={() => handleSetActive(2)}>
              <AddNewButton title="Add New Education" />
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Current City</h2>
          {activeBox.includes(3) ? (
            <CurrentCityInputBox />
          ) : (
            <div onClick={() => handleSetActive(3)}>
              <AddNewButton title="Add Current City" />
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Hometown</h2>
          {activeBox.includes(4) ? (
            <HomeTownInputBox />
          ) : (
            <div onClick={() => handleSetActive(4)}>
              <AddNewButton title="Add Hometown" />
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Relationship</h2>
          {activeBox.includes(5) ? (
            <RelationshipStatusInputBox />
          ) : (
            <div onClick={() => handleSetActive(5)}>
              <AddNewButton title="Add New Relationship status" />
            </div>
          )}
        </div>
      </div>
      <div className="flex border-t p-3 items-center justify-end">
        <div>
          <button
            onClick={() => dispatch(setSummaryModalShow(false))}
            className="rounded-md p-2 text-sm"
          >
            Cancel
          </button>
          <button className="rounded-md p-2 text-sm ml-[10px] w-[100px] bg-blue-600 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSummaryModal;
