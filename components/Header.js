import Link from "next/link";
const Header = ({hide}) => {
  return (
    <header className={` ${hide ? '' : 'bg-dark'} text-white transition duration-200 ease-in-out flex items-center flex-wrap justify-between gap-8 p-8 text-lg font-mohave h-max" `}>
      <Link href="/">
        <span className="hover:opacity-90 cursor-pointer transition font-bold font-mirrorweather tracking-wide text-xl">
          ToDOO
        </span>
      </Link>
      <nav className="flex gap-4 md:gap-8 overflow-x-auto">
        <Link href="/todo">
          <span className="hover:opacity-90 cursor-pointer transition tracking-wide ">
            Add Todos
          </span>
        </Link>
        <Link href="/check-weather">
          <span className="hover:opacity-90 cursor-pointer transition tracking-wide ">
            Check Weather
          </span>
        </Link>
        
        <Link href="/about">
          <span className="hover:opacity-90 cursor-pointer transition tracking-wide ">
            About
          </span>
        </Link>
        
      </nav>
    </header>
  );
};

export default Header;
