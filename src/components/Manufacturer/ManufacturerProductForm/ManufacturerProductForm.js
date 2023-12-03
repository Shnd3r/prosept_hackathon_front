import { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

import './ManufacturerProductForm.css';

import ManufacturerRadioButton from '../ManufacturerRadioButton/ManufacturerRadioButton';

import { products } from '../../../utils/constants';

const COLUMNS = [
  {
    Header: 'Выберите товар',
    Cell: ({ row }) => (
      <ManufacturerRadioButton />
    ),
    disableSortBy: true,
  },
  {
    Header: 'Артикул',
    accessor: 'article',
  },
  {
    Header: 'Название товара',
    accessor: 'name',
  },
  {
    Header: 'Цена (руб.)',
    accessor: 'cost',
  },
  {
    Header: 'Артикул Ozon',
    accessor: 'ozon_article',
  },
  {
    Header: "Артикул WB",
    accessor: 'wb_article',
  },
  {
    Header: "Артикул YM",
    accessor: 'ym_article',
  },
]

function ManufacturerProductForm(props) {

  const [value, setValue] = useState(null);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => products, []);

  const tableInstance = useTable({
    columns: columns,
    data: data,
  }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  function handleSubmit(event) {
    event.preventDefault()
    props.onComparePosition({ value })
  }

  function handleNotComparePosition() {
    props.onNotComparePosition({ value })
  }

  function handlePostponePosition() {
    props.onPostonePosition({ value })
  }

  return (
    <form className='manufacturer-product-form' onSubmit={handleSubmit}>
      <table className='manufacturer-table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className='manufacturer-table__row' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className='manufacturer-table__header-cell' {...column.getHeaderProps()}>
                  <div className='manufacturer-table__container'>
                    <div {...column.getSortByToggleProps()} className='manufacturer-table__sort-header'>
                      <p className='manufacturer-table__sort-title'>{column.render('Header')}</p>
                      <p className='manufacturer-table__sorted-icon'>
                        {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                      </p>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td className='manufacturer-table__cell' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="manufacturer-buttons">
        <div className='manufacturer-button-container'>
          <button className='manufacturer-button' type='submit'>Да</button>
        </div>
        <div className='manufacturer-button-container'>
          <button className='manufacturer-button' type='button' onClick={handleNotComparePosition}>Нет</button>
        </div>
        <div className='manufacturer-button-container'>
          <button className='manufacturer-button' type='button' onClick={handlePostponePosition}>Отложить</button>
        </div>
      </div>
    </form>
  )
};

export default ManufacturerProductForm;