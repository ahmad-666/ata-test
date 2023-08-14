import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "../Pagination/Pagination";
import styles from "./dataTable.module.css";
import type { Column } from "./TableHeader";
import type { Row } from "./TableBody";
import { useMemo } from "react";

type DataTableProps = {
  columns: Column[];
  rows: Row[];
  className?: string;
  pageSize?: number;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
};
export default function DataTable({
  columns,
  rows,
  className = "",
  page = 1,
  setPage = () => {},
  pageSize = 5,
}: DataTableProps) {
  const paginateRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return rows.slice(start, end);
  }, [page, pageSize, rows]);
  return (
    <div className={className}>
      <table className={`overflow-auto ${styles.dataTable} block`}>
        <TableHeader columns={columns} />
        <TableBody columns={columns} rows={paginateRows} />
      </table>
      <Pagination
        className="mt-lg"
        page={page}
        pageSize={pageSize}
        total={rows.length}
        setPage={setPage}
      />
    </div>
  );
}
