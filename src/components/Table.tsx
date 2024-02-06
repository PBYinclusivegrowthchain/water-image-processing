import { useEffect, useState } from "react";
 
const Table = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const [loading, setLoading] = useState(true);
 
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://klp2fh7w9b.execute-api.us-east-1.amazonaws.com/dev/api/devicedata/fetch-processed-images"
      );
      const data = await response.json();
      setImages(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = images.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(images.length / itemsPerPage);
 
  const handlePageChange = (pageNumber: number | string) => {
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    }
  };
 
  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];
 
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
 
      if (startPage > 1) {
        pageNumbers.push(1, "...");
      }
 
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
 
      if (endPage < totalPages) {
        pageNumbers.push("...", totalPages);
      }
    }
 
    return pageNumbers;
  };
 
  const renderTableCell = (record: any, field: string) => {
    const content =
      field === "Image" ? (
        <img
          className="object-cover"
          src={record?.fileName}
          width={250}
          height={250}
          alt={`Image`}
        />
      ) : (
        <div className="text-left">{record[field]}</div>
      );
 
    return (
      <td key={field} className="py-1 px-8 text-left">
        {content}
      </td>
    );
  };
 
  return (
    <div className="shadow-lg my-3 rounded-lg overflow-hidden">
      <div
        className="overflow-x-auto overflow-y-auto"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "thin",
          maxHeight: "800px",
        }}
      >
        <table className="w-full table-auto table">
          <thead className=" text-sm font-semibold uppercase top-0  text-gray-400 bg-gray-50 sticky">
            <tr className=" bg-black text-white font-light">
              <th className="py-4 px-32 text-left">
                <div className="font-semibold text-left">Image</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">K_mean_RG</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">Secchi Depth</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">Turbidity</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">TSM</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">cdom_ratio</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">CDOM</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">LP - Black RGB</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">
                  LP - Corrected RGB
                </div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">LP - Depth</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">LP - Gray RGB</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">LP - White RGB</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">UP - Black RGB</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">
                  UP - Corrected RGB
                </div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">UP - Depth</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">UP - Gray RGB</div>
              </th>
              <th className="py-4 px-8 text-left">
                <div className="font-semibold text-left">UP - White RGB</div>
              </th>
            </tr>
          </thead>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              Loading...
            </div>
          ) : (
            <tbody className="text-sm divide-y divide-gray-100">
              {currentData.map((record: any, ind) => (
                <tr key={ind} className="my-4">
                  {renderTableCell(record, "Image")}
                  {renderTableCell(record, "K_mean_RG")}
                  {renderTableCell(record, "SD")}
                  {renderTableCell(record, "Turb")}
                  {renderTableCell(record, "TSM")}
                  {renderTableCell(record, "cdom_ratio")}
                  {renderTableCell(record, "CDOM")}
                  {renderTableCell(record, "Lower_Panel_Black_RGB")}
                  {renderTableCell(record, "Lower_Panel_Corrected_RGB")}
                  {renderTableCell(record, "Lower_Panel_Depth")}
                  {renderTableCell(record, "Lower_Panel_Gray_RGB")}
                  {renderTableCell(record, "Lower_Panel_White_RGB")}
                  {renderTableCell(record, "Upper_Panel_Black_RGB")}
                  {renderTableCell(record, "Upper_Panel_Corrected_RGB")}
                  {renderTableCell(record, "Upper_Panel_Depth")}
                  {renderTableCell(record, "Upper_Panel_Gray_RGB")}
                  {renderTableCell(record, "Upper_Panel_White_RGB")}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 pb-3">
        {generatePageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === pageNumber
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};
 
export default Table;