import Image from "next/image";
import Pagination from "./components/Pagination";
import LatesetIssues from "./LatesetIssues";

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <div>Hello world</div>
      <LatesetIssues />
    </>
  );
}
