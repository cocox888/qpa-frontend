import { Card } from '@/components/card/kanbanCard';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    {
      title: 'Total Tasks',
      count: '28',
      change: '+14%',
      isIncrease: true,
      bgColor: 'bg-purple-200',
      textColor: 'text-purple-600',
      accentColor: 'text-purple-700',
      borderColor: 'border-purple-100',
      changeColor: 'text-purple-600 bg-purple-100/50'
    },
    {
      title: 'In Progress',
      count: '12',
      change: '+7%',
      isIncrease: true,
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-600',
      accentColor: 'text-blue-700',
      borderColor: 'border-blue-100',
      changeColor: 'text-blue-600 bg-blue-100/50'
    },
    {
      title: 'Blocked',
      count: '3',
      change: '-2%',
      isIncrease: false,
      bgColor: 'bg-red-200',
      textColor: 'text-red-600',
      accentColor: 'text-red-700',
      borderColor: 'border-red-100',
      changeColor: 'text-red-600 bg-red-100/50'
    },
    {
      title: 'Completed',
      count: '8',
      change: '+12%',
      isIncrease: true,
      bgColor: 'bg-green-200',
      textColor: 'text-green-600',
      accentColor: 'text-green-700',
      borderColor: 'border-green-100',
      changeColor: 'text-green-600 bg-green-100/50'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={`${stat.bgColor} border transition-colors duration-200 ${stat.borderColor}`}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${stat.textColor}`}>
                {stat.title}
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${stat.changeColor}`}
              >
                {stat.isIncrease ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="flex items-baseline">
              <div className={`text-2xl font-bold ${stat.accentColor}`}>
                {stat.count}
              </div>
              <div className={`ml-2 text-sm font-medium ${stat.textColor}`}>
                tasks
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-white rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${stat.textColor.replace(
                    'text',
                    'bg'
                  )}`}
                  style={{ width: `${(Number(stat.count) / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
