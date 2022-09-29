import type { NextPage } from "next";
import { ImageList } from "../../components/ImageList";

const Dog: NextPage = () => {
  const dogSrcList = [1, 2, 3, 4].map((index) => `/dog-${index}.jpeg`);
  return (
    <div>
      <ImageList srcList={dogSrcList} />
    </div>
  );
};

export default Dog;
