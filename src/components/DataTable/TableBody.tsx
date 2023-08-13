import TableCell from "./TableCell";
import type { Column } from "./TableHeader";
export type Row = {
  id: number | string;
  [key: string]: unknown;
};
type TableBodyProps = {
  columns: Column[];
  rows: Row[];
};
export default function TableBody({ columns, rows }: TableBodyProps) {
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {columns.map((col) => (
            <TableCell key={col.value} column={col} row={row} />
          ))}
        </tr>
      ))}
    </tbody>
  );
}
