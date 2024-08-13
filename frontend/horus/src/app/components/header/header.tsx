export default function Header() {
  return (
    <div className="w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-center bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 items-center">
          <img
          src="/horus.png"
          alt="Your Image"
          className="w-24 h-24 object-cover"
        />
      </div>
    </div>
  );
}
