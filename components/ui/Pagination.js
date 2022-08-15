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
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={s.paginationContainer}>
      <li className={s.paginationItem} onClick={onPrevious}>
        <Image
          src="/Arrow - Left.svg"
          width="17px"
          height="17px"
          alt="arrow left"
        />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className={s.paginationItemDots}>&#8230;</li>;
        }

        return (
          // eslint-disable-next-line react/jsx-key
          <li
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
          src="/Arrow - Right.svg"
          width="17px"
          height="17px"
          alt="arrow left"
        />
      </li>
    </ul>
  );
};

export default Pagination;
