import Image from "next/image";
import Table from '../components/Table';

export default function Home() {
  return ( 
    <div className="flex flex-col items-center justify-center mt-4 px-8 bg-white ">
      <h1 className="text-2xl font-bold mb-8">RetainIq Project</h1>
      <Table />
    </div>
  


  );
}
