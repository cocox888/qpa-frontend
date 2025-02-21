interface ButtonProps {
  title: string;
  onClick: (params: number) => void;
  index: number;
  count: number;
  isActive: boolean;
}

const ButtonSecondary: React.FC<ButtonProps> = ({
  title,
  onClick,
  index,
  count,
  isActive
}) => {
  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button
      role="tab"
      aria-selected="true"
      aria-controls="employees-panel"
      className={`px-4 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? 'text-brand-500 bg-brand-50'
          : 'text-gray-600 hover:bg-gray-50'
      } `}
      onClick={() => onClick(index)}
    >
      {title}
      <span
        className={`tab-count ml-2 px-2 py-0.5 text-xs rounded-full ${
          isActive ? ' bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default ButtonSecondary;
