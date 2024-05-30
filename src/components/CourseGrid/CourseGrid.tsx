import React, { useState, useEffect } from "react";
import { Pagination, Skeleton } from "antd";
import CourseCard from "../CourseCard/CourseCard";

interface CourseGridProps {
  data: {
    id: number;
    title: string;
    type: string;
    semester: string;
    teacher: {
      matter?: string;
    };
  }[];
  files: CourseUrl[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ data, files }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    setIsLoading(true); // Set loading to true when data changes
    setTimeout(() => {
      setIsLoading(false); // Simulating data loading completion
    }, 1000); // Adjust the timeout as needed
  }, [data]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const renderData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {isLoading ? ( // Display skeleton when loading
        <div>
          {[...Array(pageSize)].map((_, index) => (
            <Skeleton key={index} active />
          ))}
        </div>
      ) : (
        <>
          {data.length === 0 ? ( // Display message if no data
            <p>Aucun cours n'a été téléchargé pour le moment.</p>
          ) : (
            <>
              {renderData.map((item, idx) => (
                <CourseCard
                  key={idx}
                  title={item.title}
                  semester={item.semester}
                  files={files}
                  type={item.type}
                  matter={item.teacher ? item.teacher.matter : undefined}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CourseGrid;
