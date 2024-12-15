
import { useEffect, useState } from "react";

const Table = () => {
  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async () => {
    const url = `https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json`;
    const result = await fetch(url);
    const data = await result.json();
    setTableData(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const nextHandler = () => {
    let page = currentPage;
    page = page + 1;
    console.log("page page ", page);
    setCurrentPage(page);
  };

  const prevHandler = () => {
    setCurrentPage((page) => {
      if (page !== 0) {
        return page - 1;
      }
      return page;
    });
  };

  return (
    <div aria-label="Projects Data Table">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {tableData
            .slice(currentPage * 5, currentPage * 5 + 5)
            .map((item, index) => {
              return (
                <tr key={item["s.no"]}>
                  <td>{item["s.no"]}</td>
                  <td>{item["percentage.funded"]}</td>
                  <td>{item["amt.pledged"]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="buttonsWrapper">
        <button
          onClick={prevHandler}
          disabled={currentPage === 0}
          aria-disabled={currentPage === 0}
        >
          {"Prev"}
        </button>
        <button
          onClick={nextHandler}
          disabled={currentPage * 5 + 5 >= tableData.length}
          aria-disabled={currentPage * 5 + 5 >= tableData.length}
        >
          {"Next"}
        </button>
      </div>
    </div>
  );
};

export default Table;
