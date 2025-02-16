import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { notify } from "../notifier/Notifier";
import SearchBar from "../layouts/SearchBar";

const Table = (props) => {
  const {
    data,
    columns,
    isEdit,
    isDelete,
    pageSize = 5,
    onClickEdit,
    onClickDelete,
    isButtons = true,
    fileName = "table_data",
    searchValue,
    isInternalSearch = true,
  } = props;

  const [size, setSize] = useState(pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [rowData, setRowData] = useState(data);
  const [search, setSearch] = useState(searchValue);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const tableData = [];
    const firstItem = (currentPage - 1) * size;
    const lastItem =
      currentPage * size > rowData.length ? rowData.length : currentPage * size;
    for (let i = firstItem; i < lastItem; i++) {
      if (rowData[i]) {
        tableData.push(rowData[i]);
      } else {
        tableData.push({});
      }
    }
    let totalPages = rowData.length / size;
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    setPageNumbers(pages);
    setDisplayData(tableData);
    setTotalRows(rowData.length);
  }, [rowData, size, currentPage]);

  useEffect(() => {
    if (!search) {
      setRowData(data || []);
      return;
    }
    onChangeSearchValue(search);
  }, [data, search]);

  const onChangeSearchValue = (search) => {
    const filteredData = data.filter((row) => {
      return columns.some((col) => {
        const value = col.cellRender
          ? col.cellRender({ value: row[col.value] })
          : row[col.value];
        return value.toString().toLowerCase().includes(search.toLowerCase());
      });
    });
    setRowData(filteredData);
  };
  const onClick = (type, id) => {
    if (type === "edit") {
      onClickEdit(id);
    }
    if (type === "delete") {
      onClickDelete(id);
    }
  };

  const downloadData = () => {
    if (!data || data.length === 0) {
      notify("No data available to download.");
      return;
    }
    const headers = columns.map((col) => col.header).join(",") + "\n";
    const rows = data
      .map((row) =>
        columns
          .map((col) => (row[col.value] !== undefined ? row[col.value] : ""))
          .join(",")
      )
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const file = fileName + "_" + Date.now();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", file);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const mailData = () => {};
  return (
    <div className="py-2 flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="px-4 py-2 flex justify-between">
          <div className="flex gap-2 items-center">
            <span>set</span>
            <select
              type="text"
              className="input-box"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            items per page
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between">
          {isInternalSearch && (
            <div>
              <SearchBar
                onChangeSearch={onChangeSearchValue}
              />
            </div>
          )}
          {isButtons && (
            <ul className="flex gap-2 items-center">
              <li
                className="text-green-600 bg-secondary shadow-md p-1 rounded-md cursor-pointer"
                onClick={downloadData}
              >
                {<icons.Download />}
              </li>
              <li
                className="text-blue-600 bg-secondary shadow-md p-1 rounded-md cursor-pointer"
                onClick={mailData}
              >
                {<icons.Mail />}
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="bg-secondary h-72 rounded-xl overflow-auto  flex flex-col gap-1 pb-2  scroll-smooth">
        {/* Table Header */}
        <div className="flex gap-1 w-fit shadow-sm bg-orange-300 sticky top-0 z-10">
          {columns.map((column) => (
            <div
              key={column.value}
              style={{ width: column?.width || "auto", flexShrink: 0 }}
              className={`overflow-hidden justify-start  whitespace-nowrap p-2 text-center border-r-2 border-primary`}
            >
              <span className="font-semibold">{column.header}</span>
            </div>
          ))}
          {(isEdit || isDelete) && (
            <div className="flex gap-1 shadow-sm bg-orange-300 sticky right-0 z-10 ">
              <div
                style={{ width: "100px", flexShrink: 0 }}
                className={`overflow-hidden justify-center flex  whitespace-nowrap p-2 text-center border-r-2 border-primary `}
              >
                <span className="font-semibold">{"Actions"}</span>
              </div>
            </div>
          )}
        </div>
        {/* Table Rows */}
        <div className="flex flex-col gap-1">
          {displayData.map((row, rowIndex) => (
            <div className="flex  gap-1 " key={rowIndex}>
              <div className="flex gap-1 shadow-sm bg-secondary w-fit z-10">
                {columns.map((column) => (
                  <div
                    key={`${rowIndex}_${column.value}`}
                    style={{ width: column?.width || "auto", flexShrink: 0 }}
                    className={`overflow-hidden justify-start  whitespace-nowrap p-2 text-center border-r-2 border-primary `}
                  >
                    {column?.cellRender ? (
                      column.cellRender({ value: row[column.value] })
                    ) : (
                      <span>{row[column.value]}</span>
                    )}
                  </div>
                ))}
              </div>
              {(isEdit || isDelete) && (
                <div className="flex opacity-40 hover:opacity-100 gap-1  shadow-sm bg-gray-100 sticky right-0 z-10 h-10  ">
                  <div
                    style={{ width: "100px" }}
                    className={`overflow-hidden justify-between flex gap-2  whitespace-nowrap items-center border-r-2 border-primary px-4`}
                  >
                    {isEdit && Object.keys(row).length > 0 ? (
                      <div
                        className="text-blue-600 cursor-pointer"
                        onClick={() => onClick("edit", row.id)}
                      >
                        {<icons.Edit />}
                      </div>
                    ) : (
                      ""
                    )}
                    {isDelete && Object.keys(row).length > 0 ? (
                      <div
                        className="text-red-600 cursor-pointer"
                        onClick={() => onClick("delete", row.id)}
                      >
                        {<icons.Delete />}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2  justify-between items-center px-2">
        <div>
          showing{" "}
          <span className="font-semibold">{(currentPage - 1) * size + 1}</span>{" "}
          to{" "}
          <span className="font-semibold">
            {currentPage * size > totalRows ? totalRows : currentPage * size}
          </span>{" "}
          of <span className="font-semibold">{totalRows}</span>
        </div>
        <div className="flex gap-2">
          {currentPage > 1 && (
            <div
              className="px-4 shadow-sm rounded-md cursor-pointer bg-secondary flex items-center justify-center py-1 btn"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              {"prev"}
            </div>
          )}
          {pageNumbers &&
            pageNumbers.length > 0 &&
            pageNumbers.map((page, index) => {
              return (
                <div
                  key={index}
                  className={`btn px-4 shadow-sm rounded-md cursor-pointer  flex items-center justify-center py-1 ${
                    currentPage === page
                      ? "bg-primary text-secondary"
                      : "bg-secondary text-black"
                  } `}
                  onClick={() => {
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </div>
              );
            })}
          {currentPage < pageNumbers[pageNumbers.length - 1] && (
            <div
              className="btn px-4 shadow-sm rounded-md cursor-pointer bg-secondary flex items-center justify-center py-1"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              {"next"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
