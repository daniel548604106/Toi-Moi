import React, { useState, useEffect } from 'react';

const CurrentCityInputBox = ({ setActiveBox }) => {
  const [available, setAvailable] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentCity) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [currentCity]);
  return (
    <div className="space-y-3">
      <input
        className="border rounded-lg p-3 w-full"
        placeholder="Current City"
        type="text"
        onChange={(e) => setCurrentCity(e.target.value)}
      />
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => handleSubmit()}
          className={`rounded-lg p-2 px-3 w-full ${
            available
              ? 'bg-main text-white'
              : 'bg-secondary text-secondary border cursor-not-allowed'
          }`}
        >
          Save
        </button>
        <button
          onClick={() => setActiveBox(0)}
          className="rounded-lg p-2 px-3 border "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CurrentCityInputBox;
