import React, { useState } from 'react';
import { Pagination } from 'flowbite-react';

const ComponentPagination = ({ itemsPerPage, totalItems, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
    paginate(page);
  }

  return (
    <div className="flex overflow-x-auto sm:justify-center mt-4">
    <Pagination
      layout="table"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showIcons
    />
  </div>
  );
};

export default ComponentPagination;
