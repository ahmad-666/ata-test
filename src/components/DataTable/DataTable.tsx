import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import styles from "./dataTable.module.css";
import type { Column } from "./TableHeader";
import type { Row } from "./TableBody";

type DataTableProps = {
  columns: Column[];
  rows: Row[];
  className?: string;
};
export default function DataTable({
  columns,
  rows,
  className = "",
}: DataTableProps) {
  return (
    <div className={className}>
      <table className={`overflow-auto ${styles.dataTable} block`}>
        <TableHeader columns={columns} />
        <TableBody columns={columns} rows={rows} />
      </table>
    </div>
  );
}
