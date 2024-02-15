import { Link } from "@nextui-org/react";
import { Icons } from "../../assets/Icons";

export const Docs = () => {
  return (
    <aside
      className="w-full p-6 sm:w-60 border-r-1"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <nav className="space-y-8 text-sm">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracki uppercas">
            Getting Started
          </h2>
          <div className="flex flex-col space-y-1">
            <Link rel="noopener noreferrer" href="#" size="sm">
              Installation
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Plugins
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Migrations
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Appearance
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Mamba UI
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracki uppercase">Dashboard</h2>
          <div className="flex flex-col space-y-1">
            <Link rel="noopener noreferrer" href="#" size="sm">
              Header
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Drawer
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Page Title
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Menus
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Sidebar
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Footer
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracki uppercase">Pages</h2>
          <div className="flex flex-col space-y-1">
            <Link rel="noopener noreferrer" href="#" size="sm">
              Homepage
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Users
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Tools
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Settings
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracki uppercase">Misc</h2>
          <div className="flex flex-col space-y-1">
            <Link rel="noopener noreferrer" href="#" size="sm">
              Tutorials
            </Link>
            <Link rel="noopener noreferrer" href="#" size="sm">
              Changelog
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
};
