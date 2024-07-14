import { actionValues, subjectValues } from '@/common/const/permession.type';
import { FC } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Checkbox } from 'antd';

interface Props {
  field: ControllerRenderProps<any>;
}

const Permissions: FC<Props> = ({ field }) => (
  <div className="mt-3 flex flex-wrap gap-6">
    {subjectValues.slice(0, subjectValues.length - 1).map((v) => {
      return (
        <div key={v} className="relative flex w-full flex-col rounded-md border p-6 shadow-lg xs:w-44">
          <h4 className="absolute left-0 top-0 z-10 -translate-y-1/2 bg-white px-3 text-lg font-medium text-textSecondary">
            {v}
          </h4>
          <div className="mt-4 flex flex-col gap-2">
            {actionValues.map((a) => {
              const checked = field.value && field.value?.some((p: any) => p.subject === v && p.action === a);
              return (
                <Checkbox
                  key={v + a}
                  checked={checked}
                  onChange={() => {
                    if (checked) {
                      field.onChange(field.value?.filter((p: any) => !(p.subject === v && p.action === a)));
                    } else {
                      if (field.value) {
                        field.onChange([...field.value, { subject: v, action: a }]);
                      } else field.onChange([{ subject: v, action: a }]);
                    }
                  }}
                >
                  {a}
                </Checkbox>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);

export default Permissions;
