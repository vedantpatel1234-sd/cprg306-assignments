interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:bg-slate-50"
    >
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      <p className="mt-1 text-sm text-gray-700">Quantity: {quantity}</p>
      <p className="text-sm text-gray-700">
        Category: <span className="capitalize">{category}</span>
      </p>
    </li>
  );
}