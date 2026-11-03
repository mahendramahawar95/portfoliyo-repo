// import TopBar from "./TopBar";
import Navbar from "./Navbar";
// import styles from "./Header.module.css";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full animate-fade-in-down bg-white/50 shadow-navbar backdrop-blur-[3px] xl:shadow-none xl:mask-[linear-gradient(#000_calc(100%-20px),transparent)]"
      role="banner"
    >
      {/* <TopBar /> */}
      <Navbar />
    </header>
  );
}
