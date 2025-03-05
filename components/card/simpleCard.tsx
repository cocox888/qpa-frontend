interface SimpleCardProps {
  title: string;
  type: number;
  count: number;
  maxVal: number;
  usedVal: number;
  completion: number;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  title,
  type,
  count,
  maxVal,
  usedVal,
  completion
}) => {
  return (
    <div
      className="stats-card animate-in card-shine bg-white rounded-xl border border-gray-100 p-4"
      style={{ animationDelay: '0.3s' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{count}</h3>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${
            type == 0
              ? 'bg-blue-50 text-blue-700'
              : 'bg-purple-50 text-purple-700'
          } `}
        >
          {type == 0 ? 'Hourly' : 'Fixed Price'}
        </span>
      </div>
      {/* <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">
            {type == 0 ? 'Hours Used' : 'Completion'}
          </span>
          <span className="text-gray-900 font-medium">
            {type == 0 ? usedVal + '/' + maxVal : completion + '%'}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`${
              type === 0 ? 'bg-blue-500' : 'bg-purple-500'
            } h-1.5 rounded-full`}
            style={{
              width:
                type === 0 ? `${(usedVal / maxVal) * 100}%` : `${completion}%`
            }}
          ></div>
        </div>
      </div> */}
    </div>
  );
};

export default SimpleCard;
