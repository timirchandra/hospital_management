import React from "react";

const Table = ({ data, columns }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((col, index) => (
              <td key={index}>{item[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
