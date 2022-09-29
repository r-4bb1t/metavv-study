import type { NextPage } from "next";
import { ImageList } from "../../components/ImageList";

const Cat: NextPage = () => {
  const catSrcList = [1, 2, 3, 4].map((index) => `/cat-${index}.jpeg`);

  return (
    <div>
      <ImageList srcList={catSrcList} />
    </div>
  );
};

export default Cat;
