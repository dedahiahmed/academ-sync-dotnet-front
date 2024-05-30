import Link from "next/link";
import Duration from "./Components/Duration";
import SubTitle from "./Components/SubTitle";
import Title from "./Components/Title";

interface LessonCardGridProps {
  idx: number;
  item: {
    thumbnail: string;
    title: string;
    description: string;
  };
}

const LessonCardGrid: React.FC<LessonCardGridProps> = ({
  idx,
  item: { thumbnail, title, description },
}) => {
  return (
    <div className="space-y-2 sm:max-w-sm">
      <img src={thumbnail} className="rounded-lg w-full" alt={title} />

      <div className="pt-2 text-sm flex items-center justify-between">
        <SubTitle>
          <Link href={`/tutorials/cs50/`}>{title}</Link>
        </SubTitle>
      </div>

      <p>{description}</p>
    </div>
  );
};

export default LessonCardGrid;
