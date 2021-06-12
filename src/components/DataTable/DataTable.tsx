import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';
import FriendlyLoading from '../FriendlyLoading/FriendlyLoading';
import './DataTable.css';

type Props = {
  data: any[];
  columns: Column[];
  pagination: PaginationOption;
  renderFooter?: () => void;
  isLoading?: boolean;
}

type PaginationOption = {
  pageSize?: number;
  defaultCurrent?: number;
};

type Column = {
  title: string;
  key: string;
  dataIndex: string;
  icon?: React.ReactNode;
  render?: (text: string) => void;
}

const DataTable: React.FC<Props> = ({ data, columns, pagination, renderFooter, isLoading }) => {
  const { defaultCurrent, pageSize = 5 } = pagination;
  let [page, setPage] = useState(1);

  const renderData = useMemo(() => {
    return data.slice(pageSize * (page - 1), pageSize * page);
  }, [data, page, pageSize]);

  return (
    <div className="table-wrapper">
      {isLoading && <FriendlyLoading />}
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.icon} {column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderData?.map(dataItem => (
            <tr key={dataItem.key}>
              {columns.map(({key, render}) => {
                let content = dataItem[key];

                if (render && typeof render === 'function') {
                  content = render(dataItem[key]);
                }

                return <td key={key}>{content}</td>
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns?.length}>
              {renderFooter && renderFooter()}
              <div className="pull-right">
                <Pagination
                  total={data?.length}
                  defaultCurrent={defaultCurrent}
                  onChange={(nextPage) => setPage(nextPage)}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default DataTable;
