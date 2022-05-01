import Header from "./Header.js";
const Layout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <body className="min-h-screen bg-gradient-to-tr from-blue-100 to-pink-100">{children}</body>
    </div>
  );
};

export default Layout;
