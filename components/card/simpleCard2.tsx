interface SimpleCard2Props {
  count: number;
  title: string;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SimpleCard2: React.FC<SimpleCard2Props> = ({
  count,
  title,
  icon: Icon,
  color
}) => {
  return (
    <div
      className="stats-card animate-in card-shine gradient-border card-shine p-4 rounded-xl"
      style={{ animationDelay: '0.3s' }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center`}
        >
          <Icon />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-xl font-bold text-gray-900">{count}</h3>
        </div>
      </div>
    </div>
  );
};

export default SimpleCard2;
