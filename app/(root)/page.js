
export default function Home() {
  return(
    <>
      <header>
        <div className="flex justify-between bg-gray-300 py-4 px-6 rounded-xl shadow-2xl mt-12 mx-[5%]">
          <h1 className="text-2xl font-bold">NextJS</h1>
          <div className="flex gap-4">
            <button className="bg-gray-200 font-bold py-1 px-2 rounded-xl shadow-lg">Sign Up</button>
            <button className="bg-gray-200 font-bold py-1 px-2 rounded-xl shadow-lg">Sign In</button>
          </div>
        </div>
      </header>
    </>
  );
}
