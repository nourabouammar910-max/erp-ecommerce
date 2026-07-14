interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function UserSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      placeholder="Search user..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: 300,
        padding: 10,
        marginBottom: 20,
      }}
    />
  );
}