import React, { useState, useEffect } from 'react';
import { apiPatchProfileBio } from '../../api';
import { useSelector } from 'react-redux';
const BioInput = ({ isEditable, bio, originalBio, setBio }) => {
  const [bioInputOpen, setBioInputOpen] = useState(false);
  const [bioLengthLeft, setBioLengthLeft] = useState(80);
  const { username } = useSelector((state) => state.user.userInfo);

  const [disable, setDisable] = useState(false);

  const handleSendBio = async () => {
    if (disable) return;
    setBioInputOpen(false);
    try {
      const { data } = await apiPatchProfileBio({ username, bio });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelChanges = () => {
    setBioInputOpen(false);
    setBio(originalBio);
  };

  useEffect(() => {
    if (bio && bio !== '') {
      setBioLengthLeft(80 - bio.length);
    }
    if (bioLengthLeft < 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [bio, bioLengthLeft]);
  return (
    <div>
      {bioInputOpen ? (
        <div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="h-[120px] focus:outline-none p-2 bg-gray-100 rounded-xl  w-[300px] overflow-y-scroll"
            type="text"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs tex-gray-400">
              {bioLengthLeft} text left{' '}
            </span>
            <div className="flex items-center ">
              <button
                onClick={() => handleCancelChanges()}
                className="px-4 py-2 rounded-md bg-secondary text-secondary border text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendBio()}
                className={`${
                  disable && 'bg-gray-200 cursor-not-allowed'
                } ml-[10px] px-4 py-2 rounded-md bg-main text-white border text-xs `}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[300px] flex flex-col items-center justify-center">
          <span>{bio}</span>
          {isEditable && (
            <span
              onClick={() => setBioInputOpen(true)}
              className="text-main cursor-pointer"
            >
              Edit
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BioInput;
