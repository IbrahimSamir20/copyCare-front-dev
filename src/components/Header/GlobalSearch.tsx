import { Dispatch, FC, SetStateAction } from 'react';
import { Input, Tooltip } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  setSearchMode: Dispatch<SetStateAction<boolean>>;
}

const GlobalSearch: FC<Props> = ({ setSearchMode }) => {
  return (
    <div className="flex items-center justify-between rounded bg-white p-4 shadow-xl">
      <Input
        variant="borderless"
        placeholder="Enter your username"
        prefix={<CiSearch className="text-xl" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={
          <Tooltip title="Exit Search Mode">
            <IoCloseOutline
              className="cursor-pointer text-xl"
              onClick={() => setSearchMode(false)}
              style={{ color: 'rgba(0,0,0,.45)' }}
            />
          </Tooltip>
        }
      />
    </div>
  );
};

export default GlobalSearch;
