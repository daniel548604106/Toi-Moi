import React from 'react';

const SummaryListItem = ({ company_name, school_name, job_title, Icon }) => {
  return (
    <div className="flex items-center my-2 space-x-2">
      <Icon className="h-6" />
      <span>在</span>
      <span>{company_name || school_name}</span>
      <span>擔任</span>
      <span>{job_title}</span>
    </div>
  );
};

export default SummaryListItem;
