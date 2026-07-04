import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Home",
    path: "/student",
  },
  {
    title: "Quick Tools",
    path: "/student#quick-tools",
  },
  {
    title: "Resources",
    path: "/student/resources",
  },
  {
    title: "Community",
    path: "/student/community",
  },
];

function NavbarLinks() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `font-medium transition ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
            }`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavbarLinks;