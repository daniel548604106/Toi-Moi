import React from 'react';

const SettingsPopup = () => {
  return (
    <div className="rounded-lg p-3 w-[300px] space-y-2 shadow-lg bg-secondary">
      <h2 className="text-md sm:text-lg font-semibold">Messenger Settings</h2>
      <p className="text-sm sm:text-md ">自訂 Messenger 體驗。</p>
      <hr />
      <div className="flex space-x-2 justify-between items-center">
        <div>
          <span>Message Popup</span>
        </div>
      </div>
      <div className="flex space-x-2 justify-between items-center">
        <div>
          <span>Notification Sound</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
