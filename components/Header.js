import Link from "next/link"
import Intro from "../components/Intro.jsx"
const Header = () => {
  return (
    <>
    <div className="pt-4 mb-8 max-w-container mx-auto">
      <Link href="/"><a className="text-xl">🏡My Home Page🏡</a></Link>
    </div>
    </>
  );
};
export default Header;
