interface NoColorBadgeProps {
  title: string;
  count: number;
}

const NoColorBadge: React.FC<NoColorBadgeProps> = ({ title, count }) => {
  return (
    <div className="p-3 rounded-xl bg-gray-50">
      <div className="text-sm font-medium text-gray-900">{count}</div>
      <div className="text-xs text-gray-500">{title}</div>
    </div>
  );
};

export default NoColorBadge;
