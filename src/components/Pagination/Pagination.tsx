import usePagination from "../../hooks/usePagination";
type PageItemProps = {
  active?: boolean;
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
  className?: string;
};
const PageItem = ({
  active = false,
  disabled = false,
  children,
  onClick = () => {},
}: PageItemProps) => {
  const bgColor = active ? "primary" : "transparent";
  const color = active
    ? "white--text"
    : disabled
    ? "slate-light2--text"
    : "slate-light1--text";
  return (
    <li
      style={{ width: "32px", height: "32px" }}
      className="overflow-hidden rounded-sm mx-xs"
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className={`
        w-full h-full text-sm  
        ${bgColor} ${color} ${disabled ? "cursor-auto" : ""}
        `}
      >
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
  className = "",
}: PaginationProps) {
  const { pages, totalPages } = usePagination({
    currentPage: page,
    pageSize,
    totalItems: total,
    siblingCount: sibling,
  });
  return (
    <div className={`flex justify-center items-center wrap ${className}`}>
      <ul className="flex items-center wrap">
        <PageItem
          disabled={page === 1}
          onClick={() => setPage((old) => old - 1)}
        >
          {`<<`}
        </PageItem>
        {pages.map((p, i) => (
          <div key={`${i}-${p}`}>
            {p === "..." && <PageItem disabled>...</PageItem>}
            {p !== "..." && (
              <PageItem
                active={page === p}
                disabled={false}
                onClick={() => setPage(p as number)}
              >
                {p}
              </PageItem>
            )}
          </div>
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
