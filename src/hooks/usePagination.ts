type UsePaginationArgs = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  siblingCount: number;
};
const generatePages = (start: number, end: number) => {
  const arr = [];
  const length = end - start + 1;
  for (let i = 0; i < length; i++) arr[i] = i + start;
  return arr;
};
const usePagination = ({
  currentPage,
  pageSize,
  totalItems,
  siblingCount = 1,
}: UsePaginationArgs) => {
  let pages: (number | string)[] = [];
  const totalPages = Math.ceil(totalItems / pageSize);
  const totalVisiblePages = siblingCount + 5; //first page + dot + active page + dot + last page
  if (totalPages <= totalVisiblePages) pages = generatePages(1, totalPages); //if we don't want any dots
  const firstPage = 1;
  const lastPage = totalPages;
  const leftSiblingStart = Math.max(firstPage, currentPage - siblingCount);
  const rightSiblingEnd = Math.min(currentPage + siblingCount, lastPage);
  const showLeftDots = leftSiblingStart >= firstPage + 2; //1 for active page , 1 for first page
  const showRightDots = rightSiblingEnd <= totalPages - 2; //1 for active page , 1 for last page
  if (showLeftDots && !showRightDots) {
    const rightRange = generatePages(leftSiblingStart, totalPages);
    pages = [firstPage, "...", ...rightRange];
  } else if (!showLeftDots && showRightDots) {
    const leftRange = generatePages(1, rightSiblingEnd);
    pages = [...leftRange, "...", totalPages];
  } else if (showLeftDots && showRightDots) {
    const middleRange = generatePages(leftSiblingStart, rightSiblingEnd);
    pages = [firstPage, "...", ...middleRange, "...", lastPage];
  }
  return {
    pages,
    totalPages,
    totalVisiblePages,
    firstPage,
    lastPage,
    leftSiblingStart,
    rightSiblingEnd,
  };
};
export default usePagination;
