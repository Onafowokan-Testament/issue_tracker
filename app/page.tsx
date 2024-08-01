import Image from "next/image";
import Pagination from "./components/Pagination";

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <div>Hello world</div>

      <Pagination
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
        itemCount={40}
      ></Pagination>
    </>
  );
}
