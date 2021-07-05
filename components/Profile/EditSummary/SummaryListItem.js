import React from 'react';

const SummaryListItem = ({
  company_name,
  school_name,
  major,
  job_title,
  Icon
}) => {
  return (
    <div className="flex items-center my-2 space-x-2">
      <Icon className="h-6" />
      <span>在</span>
      <span>{company_name || school_name}</span>
      <span>{school_name ? '主修' : '擔任'}</span>
      <span>{job_title || major}</span>
    </div>
  );
};

export default SummaryListItem;
