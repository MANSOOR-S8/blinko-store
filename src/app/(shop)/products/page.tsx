import Navbar from "@/components/layout/Header";
export default function Placeholder() {
  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="products">
          <h1 className="text-center text-3xl">No Products available.. </h1>
        </div>
      </div>
    </>
  );
}
