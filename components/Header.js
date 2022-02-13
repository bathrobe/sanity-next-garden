import Link from "next/link"
import Intro from "../components/Intro.jsx"
const Header = () => {
  return (
    <>
    <div className="flex justify-between pt-4 mb-8 max-w-container mx-auto">
      <Link href="/"><a className="text-xl">🏡My Garden🏡</a></Link>
      <Link href="/graph"><a className="hover:underline">View Graph</a></Link>
    </div>
    </>
  );
};
export default Header;
