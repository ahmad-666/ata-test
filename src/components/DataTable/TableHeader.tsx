type Data = {
  label: string;
  value: unknown;
};
export type Column = {
  label: string;
  value: string;
  width?: number;
  render?: null | ((data: Data, column: Column) => React.ReactNode);
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
            style={{ width: `${col.width || 200}px` }}
            key={`head-${col.value}`}
            className="text-start p-md slate-dark2--text font-bold text-md"
          >
            {col.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
