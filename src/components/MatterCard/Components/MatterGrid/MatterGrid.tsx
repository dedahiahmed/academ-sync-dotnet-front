import React, { useState, useEffect } from "react";
import MatterCard from "../../MatterCard";
import { Pagination } from "antd";

interface MatterGridProps {
  data: {
    semester: string;
    title: string;
    teacher: string;
    description: string;
    number_of_hours: number;
  }[];
}

const MatterGrid: React.FC<MatterGridProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Update currentPage to 1 whenever a filter is changed
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterChange();
  }, [data]); // Reset currentPage whenever data changes

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const renderData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {renderData.map((item, idx) => (
        <MatterCard
          key={idx}
          title={item.title}
          teacher={item.teacher}
          description={item.description}
          numberofhourse={item.number_of_hours}
          semestre={item.semester}
        />
      ))}
      <div className="text-right mt-4">
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default MatterGrid;
