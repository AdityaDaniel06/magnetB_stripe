import { Outlet } from "react-router";
import TopNavbar from "../features/ui/TopNavbar";
import MainFooter from "../features/ui/MainFooter";

function Layout() {
  return (
    <>
      <div className="wrapper">
        <header>
          <TopNavbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer className="footer">
          <MainFooter />
        </footer>
      </div>
    </>
  );
}

export default Layout;
