import { ReactNode, FC } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  buttons?: ReactNode;
}

const MainWrapper: FC<Props> = ({ children, title, buttons }) => {
  return (
    <div className="flex-grow overflow-auto">
      <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-md">
        <div className="text-lg font-medium text-textPrimary">{title}</div>
        <div className="flex gap-2">{buttons}</div>
      </div>
      <div className="mt-6 overflow-hidden rounded-md border bg-white p-4 shadow-md">{children}</div>
    </div>
  );
};

export default MainWrapper;
