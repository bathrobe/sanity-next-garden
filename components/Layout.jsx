import Header from "./Header.js";
const Layout = ({ children }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
