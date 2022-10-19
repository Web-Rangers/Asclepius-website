import React from "react";
import { usePagination, DOTS } from "./usePagination";
import s from "../../styles/pagination.module.css";
import Image from "next/image";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    paginationRange.length !== currentPage && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage > 1 ? onPageChange(currentPage - 1) : onPageChange(currentPage);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={s.paginationContainer}>
      <li className={s.paginationItem} onClick={onPrevious}>
        <Image
          src="/arrowLeft.svg"
          width="15px"
          height="12px"
          alt="arrow left"
        />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className={s.paginationItemDots}>&#8230;</li>;
        }
        return (
          <li
            key={index}
            className={
              pageNumber === currentPage
                ? s.paginationitemselected
                : s.paginationItem
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={s.paginationItem} onClick={onNext}>
        <Image
          src="/arrowRight.svg"
          width="15px"
          height="12px"
          alt="arrow left"
        />
      </li>
    </ul>
  );
};

export default Pagination;
