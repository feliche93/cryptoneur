import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-base-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
