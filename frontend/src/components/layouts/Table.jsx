import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { notify } from "../notifier/Notifier";
import SearchBar from "../layouts/SearchBar";
import api from "../../helpers/api";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Table = (props) => {
  const {
    data,
    columns,
    isEdit,
    isDelete,
    pageSize = 5,
    onClickRow,
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
  const [totalNoOfPages, setTotalNoOfPages] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

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
    let totalPages = Math.ceil(rowData.length / size);
    const pages = [];
    const startPage = currentPage > 1 ? currentPage - 1 : currentPage;
    const endPage =
      currentPage + 1 > totalPages ? currentPage : currentPage + 1;
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
    setDisplayData(tableData);
    setTotalRows(rowData.length);
    setTotalNoOfPages(totalPages);
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
    setCurrentPage(1);
  };
  const onClick = (type, data) => {
    onClickRow(type, data);
  };

  const generateCSV = () => {
    const headers = columns.map((col) => col.header).join(",") + "\n";
    const rows = data
      .map((row) =>
        columns
          .map((col) => (row[col.value] !== undefined ? row[col.value] : ""))
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}${rows}`;
    const csvBlob = new Blob([csvContent], { type: "text/csv" });
    return csvBlob;
  };

  const downloadData = () => {
    if (!data || data.length === 0) {
      notify.error("No data available to download.");
      return;
    }
    //generate csv
    const csvBlob = generateCSV();
    const file = fileName + "_" + Date.now();
    const encodedUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUrl);
    link.setAttribute("download", file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const mailData = async () => {
    setLoading(true);
    const date = new Date().toLocaleDateString();
    const csvBlob = generateCSV();

    const formData = new FormData();
    const subject = `${date} : ${fileName}`;
    const htmlText = `<h4>Hi ${user?.username || "Admin"} ,</h1>
    <p>Please find the attached document for the requested product data.</p>
    <p>Thanks & Regards ,</p>
    <p>Mahesh Opticals</p>
    <h5>See you again!</h5>
    `;
    formData.append("subject", subject);
    formData.append("htmlBody", htmlText);
    formData.append("mailBody", "");
    formData.append("file", csvBlob, fileName);
    const resposne = await api.sendMail(formData);
    if (resposne.success) {
      notify.success(resposne.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    notify.error(resposne.message);
  };

  return (
    <div className="py-2 flex flex-col gap-2">
      {loading && <Loader />}
      <div className="flex flex-col md:flex-row justify-between items-center basis-2/4 gap-2">
        <div className="px-4 py-2 flex justify-center basis-2/4">
          <div className="flex gap-2 items-center w-full ">
            <span>set</span>
            <select
              type="text"
              className="input-box w-fit"
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
        <div className="flex gap-4 items-center basis-2/4 justify-between px-2 w-full">
          <div className="flex gap-2 items-center basis-3/4">
            {isInternalSearch && (
              <SearchBar onChangeSearch={onChangeSearchValue} />
            )}
          </div>
          {isButtons && (
            <ul className="flex gap-2 items-center basis-1/4 justify-end">
              <li
                className="text-green-600 bg-secondary shadow-md p-2 rounded-md cursor-pointer btn w-fit"
                onClick={downloadData}
              >
                {<icons.Download />}
              </li>
              <li
                className="text-blue-600 bg-secondary shadow-md p-2 rounded-md cursor-pointer btn w-fit"
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
        <div className="flex gap-1 w-fit shadow-sm bg-orange-300 sticky top-0 z-20">
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
                <div className="flex opacity-100 gap-1  shadow-sm bg-gray-100 sticky right-0 z-10 h-10  ">
                  <div
                    style={{ width: "100px" }}
                    className={`overflow-hidden justify-between flex gap-2  whitespace-nowrap items-center border-r-2 border-primary px-4`}
                  >
                    {isEdit && Object.keys(row).length > 0 ? (
                      <div
                        className="text-blue-600 cursor-pointer"
                        onClick={() => onClick("edit", row)}
                      >
                        {<icons.Edit />}
                      </div>
                    ) : (
                      ""
                    )}
                    {isDelete && Object.keys(row).length > 0 ? (
                      <div
                        className="text-red-600 cursor-pointer"
                        onClick={() => onClick("delete", row)}
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
        <div className="flex gap-2">
          <div>
            showing{" "}
            <span className="font-semibold">
              {totalRows > 0 ? (currentPage - 1) * size + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {currentPage * size > totalRows ? totalRows : currentPage * size}
            </span>{" "}
            of <span className="font-semibold">{totalRows}</span>
          </div>
          <span>{"|"}</span>
          <div>
            Page <span className="font-semibold">{currentPage} </span>
            of{" "}
            <span className="font-semibold">
              {" "}
              {totalNoOfPages === 0 ? 1 : totalNoOfPages}
            </span>
          </div>
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
