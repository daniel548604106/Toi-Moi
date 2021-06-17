import React, { useState, useEffect } from 'react';

const BioInput = ({ isEditable, bio, originalBio, setBio, sendUpdates }) => {
  const [bioInputOpen, setBioInputOpen] = useState(false);
  const [bioLengthLeft, setBioLengthLeft] = useState(80);

  const [disable, setDisable] = useState(false);

  const handleSendBio = () => {
    if (disable) return;
    setBioInputOpen(false);
    sendUpdates(bio);
  };

  const handleCancelChanges = () => {
    setBioInputOpen(false);
    setBio(originalBio);
  };

  useEffect(() => {
    if (bio !== '') {
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
                className="px-4 py-2 rounded-md bg-white border text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendBio()}
                className={`${
                  disable && 'bg-gray-200 cursor-not-allowed'
                } ml-[10px] px-4 py-2 rounded-md bg-blue-600 text-white border text-xs `}
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
              className="text-blue-600 cursor-pointer"
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
