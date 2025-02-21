interface ButtonProps {
  title: string;
  onClick: () => void;
}

const ButtonPrimary: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition-colors text-center cursor-pointer"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default ButtonPrimary;
