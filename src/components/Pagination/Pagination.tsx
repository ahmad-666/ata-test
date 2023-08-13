import usePagination from "../../hooks/usePagination";
type PageItemProps = {
  disabled: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
type PaginationProps = {
  page: number;
  pageSize?: number;
  total: number;
  sibling?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
const PageItem = ({
  disabled,
  children,
  onClick = () => {},
}: PageItemProps) => {
  return (
    <li>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </li>
  );
};
export default function Pagination({
  page,
  pageSize = 10,
  total,
  sibling = 1,
  setPage,
}: PaginationProps) {
  const { pages, totalPages } = usePagination({
    currentPage: page,
    pageSize,
    totalItems: total,
    siblingCount: sibling,
  });
  return (
    <div className="flex justify-center items-center wrap">
      <ul>
        <PageItem
          disabled={page === 1}
          onClick={() => setPage((old) => old - 1)}
        >
          {`<<`}
        </PageItem>
        {pages.map((p, i) => (
          <>
            {p === "..." && (
              <PageItem key={`${i}-...`} disabled>
                ...
              </PageItem>
            )}
            {p !== "..." && (
              <PageItem
                key={p}
                disabled={false}
                onClick={() => setPage(p as number)}
              >
                {p}
              </PageItem>
            )}
          </>
        ))}
        <PageItem
          disabled={page === totalPages}
          onClick={() => setPage((old) => old + 1)}
        >
          {`>>`}
        </PageItem>
      </ul>
    </div>
  );
}
