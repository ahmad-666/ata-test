type Data = {
  label: string;
  value: unknown;
};
export type Column = {
  label: string;
  value: string;
  width: number;
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
          <th style={{ width: `${col.width}px` }} key={`head-${col.value}`}>
            {col.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
