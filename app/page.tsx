import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <div>Hello world</div>

      <Pagination pageSize={10} currentPage={1} itemCount={40}></Pagination>
    </>
  );
}
