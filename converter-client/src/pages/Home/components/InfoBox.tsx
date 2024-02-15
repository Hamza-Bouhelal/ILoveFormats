export interface InfoBoxProps {
  key?: number;
  title: string;
  description: string;
  icon: React.JSX.Element;
}

export const InfoBox = ({ title, description, icon, key }: InfoBoxProps) => {
  return (
    <div
      key={key}
      className="shadow-xl w-[80vw] min-h-[70vh mx-auto mt-[50px] border-2 border-primary-500 rounded-lg flex flex-col justify-center items-center p-6"
    >
      <div className="w-20 h-20 bg-primary-500 rounded-full flex justify-center items-center">
        {icon}
      </div>
      <div className="text-2xl font-bold text-center my-4">{title}</div>
      <div className="text-center">
        {description.split("\n").map((line, idx) => (
          <p key={idx} className="text-lg font-light">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
