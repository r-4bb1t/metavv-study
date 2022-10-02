import type { NextPage } from "next";
import { ImageList } from "../../components/ImageList";

const Hamster: NextPage = () => {
  const hamsterSrcList = [1, 2, 3, 4].map((index) => `/hamster-${index}.jpeg`);

  return (
    <div>
      <ImageList srcList={hamsterSrcList} />
    </div>
  );
};

export default Hamster;
