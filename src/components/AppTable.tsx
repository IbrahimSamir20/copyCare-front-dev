import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Table, TablePaginationConfig, TableProps } from 'antd';
import { FC, useMemo, useRef, useState } from 'react';
import { useUpdateEffect, useWindowSize } from 'react-use';

interface Props extends TableProps {
  total: number;
  queryKey?: string;
}

const MainTable: FC<Props> = ({ total, queryKey, ...rest }) => {
  console.log(rest.dataSource);
  const MainWrapper = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowSize();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const search: Record<string, string> = useSearch({
    strict: false,
  });

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: +search.page ?? 1,
    pageSize: +search.limit ?? 10,
    total: total ?? 10,
    showSizeChanger: true,
    showQuickJumper: true,
    // hideOnSinglePage: true,
  });

  const [sort, setSort] = useState<string>('');
  useUpdateEffect(() => {
    navigate({
      to: location.pathname,
      search: { ...search, order: sort, page: pagination.current, limit: pagination.pageSize },
    });
  }, [[pagination, sort]]);

  useUpdateEffect(() => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  }, [search]);

  const scrollY: number = useMemo(() => {
    return (MainWrapper.current?.clientHeight as number) - 130;
  }, [height, width, pagination.pageSize]);

  return (
    <div ref={MainWrapper} className="overflow-hidden">
      <Table
        {...rest}
        pagination={pagination}
        rowKey="id"
        // scroll={{ y: scrollY, x: MainWrapper.current?.clientWidth }}
        onChange={(p, f, s) => {
          setPagination(p);
          const so: any = { ...s };
          if (so.field && so.order) {
            setSort(`${so.field}:${so.order === 'ascend' ? 'ASC' : 'DESC'}`);
          } else {
            setSort('');
          }
        }}
      />
    </div>
  );
};

export default MainTable;
