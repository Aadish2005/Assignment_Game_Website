import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page);
    setSearchParams(newParams);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <BSPagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );

    // First page
    if (startPage > 1) {
      items.push(
        <BSPagination.Item
          key={1}
          onClick={() => handlePageChange(1)}
        >
          1
        </BSPagination.Item>
      );
      if (startPage > 2) {
        items.push(<BSPagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <BSPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </BSPagination.Item>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<BSPagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <BSPagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </BSPagination.Item>
      );
    }

    // Next button
    items.push(
      <BSPagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <BSPagination className="justify-content-center mt-4">
      {renderPaginationItems()}
    </BSPagination>
  );
};

export default Pagination; 