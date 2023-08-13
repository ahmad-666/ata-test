import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import type { Column } from "./TableHeader";
import type { Row } from "./TableBody";

type DataTableProps = {
  columns: Column[];
  rows: Row[];
};
export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div>
      <table>
        <TableHeader columns={columns} />
        <TableBody columns={columns} rows={rows} />
      </table>
    </div>
  );
}
