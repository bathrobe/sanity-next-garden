import Header from "./Header.js";
const Layout = ({ children }) => {
  return (
    <div className="max-w-container mx-auto">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
