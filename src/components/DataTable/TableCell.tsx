import type { Column } from "./TableHeader";
import type { Row } from "./TableBody";
type TableCellProps = {
  column: Column;
  row: Row;
};
export default function TableCell({ column, row }: TableCellProps) {
  return (
    <td>
      {!column.render
        ? (row[column.value] as string)
        : column.render(
            {
              label: column.label,
              value: row[column.value],
            },
            column
          )}
    </td>
  );
}