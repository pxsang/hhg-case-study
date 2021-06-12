import React, { useEffect, useState, useCallback } from 'react'
import './Pagination.css';

type Props ={
  defaultCurrent?: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

const PAGE_SIZE = 5;

const Pagination: React.FC<Props> = ({ defaultCurrent = 1, total, pageSize, onChange }) => {
  let [page, setPage] = useState(defaultCurrent || 1);
  const totalPages = Math.ceil(total / (pageSize || PAGE_SIZE));

  useEffect(() => {
    setPage(defaultCurrent);
  }, [defaultCurrent]);

  useEffect(() => {
    onChange(page);
  }, [page, onChange]);

  const onPrev = useCallback(() => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }, [page]);

  const onNext = useCallback(() => {
    if (page !== totalPages) {
      setPage(page + 1)
    }
  }, [page, totalPages]);

  return (
    <ul className="pagination">
      <li
        className="pagination-prev"
        onClick={onPrev}
      >
        <a rel="nofollow"><i className="fa fa-chevron-left" /></a>
      </li>
      {Array(totalPages).fill('').map((_, index) => {
        const temp = index + 1;
        return (
          <li
            key={index}
            className={`pagination-item ${temp === page ? 'pagination-item-active' : ''}`}
            onClick={() => setPage(temp)}
          >
            <a rel="nofollow">{temp}</a>
          </li>
        );
      })}
      <li
        className="pagination-next"
        onClick={onNext}
      >
        <a rel="nofollow"><i className="fa fa-chevron-right" /></a>
      </li>
    </ul>
  )
}

export default Pagination;