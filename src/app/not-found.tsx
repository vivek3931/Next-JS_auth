import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-dvh bg-gray-50">
      <div className="flex flex-col items-center space-y-6 p-8 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl font-bold text-gray-800">Not Found</h2>
          <hr className="w-24 border-2 border-gray-300" />
        </div>
        <p className="text-lg text-gray-600">Could not find requested resource</p>
        <Link 
          href="login" 
          className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
