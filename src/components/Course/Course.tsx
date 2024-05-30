import Link from "next/link";
import SectionWrapper from "../SectionWrapper/SectionWrapper";
import LessonCardGrid from "../LessonCardGrid/LessonCardGrid";
import lessonsExamples from "./lessonExamples/lessons.json";
const Course = () => {
  return (
    <SectionWrapper>
      <div className="custom-screen text-gray-600 dark:text-gray-300">
        <div className="max-w-xl space-y-3">
          <h2 className="text-gray-800 dark:text-gray-50 text-3xl font-semibold sm:text-4xl">
            Découvrons dès maintenant les modules de notre parcours.
          </h2>
        </div>
        <div className="mt-12">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {lessonsExamples.map((item, idx) => (
              <li key={idx}>
                <LessonCardGrid idx={idx} item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Course;
