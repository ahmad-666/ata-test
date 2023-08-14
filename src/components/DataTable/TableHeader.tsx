import type { Row } from "./TableBody";
type Data = {
  label: string;
  value: any;
};
export type Column = {
  label: string;
  value: string;
  minWidth?: number;
  render?: null | ((data: Data, row: Row) => React.ReactNode);
};
type TableHeaderProps = {
  columns: Column[];
};
export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            style={{ minWidth: `${col.minWidth || 130}px` }}
            key={`head-${col.value}`}
            className="text-start p-md slate-dark2--text font-bold text-md"
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
