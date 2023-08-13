import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import styles from "./dataTable.module.css";
import type { Column } from "./TableHeader";
import type { Row } from "./TableBody";

type DataTableProps = {
  columns: Column[];
  rows: Row[];
};
export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div>
      <table className={`${styles.dataTable}`}>
        <TableHeader columns={columns} />
        <TableBody columns={columns} rows={rows} />
      </table>
    </div>
  );
}
