interface ColorBadgeProps {
  title: string;
  count: number;
  color: string;
}

const ColorBadge: React.FC<ColorBadgeProps> = ({ title, count, color }) => {
  return (
    <div className="p-3 rounded-xl bg-gray-50 relative group cursor-pointer hover:bg-gray-100 transition-all">
      <div
        className={`absolute -top-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full ring-2 ring-white`}
      />
      <div className="text-sm font-medium text-gray-900">{count}</div>
      <div className="text-xs text-gray-500">{title}</div>
    </div>
  );
};

export default ColorBadge;
