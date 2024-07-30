/* eslint-disable */

import { HiX } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ open, onClose }) => {
  const router = useRouter();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return router.pathname.includes(routeName);
  };
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          N0T <span className="font-medium">Dash</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Link href="/dashboard/main">
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span
                className={`${
                  activeRoute("/dashboard/main")
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {/* Put icon here if any */}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute("/dashboard/main")
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                Main
              </p>
            </li>
            {activeRoute("/dashboard/main") ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
        <Link href="/dashboard/team">
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span
                className={`${
                  activeRoute("/dashboard/team")
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {/* Put icon here if any */}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute("/dashboard/team")
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                Team
              </p>
            </li>
            {activeRoute("/dashboard/team") ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
        <Link href="/dashboard/portfolio">
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span
                className={`${
                  activeRoute("/dashboard/portfolio")
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {/* Put icon here if any */}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute("/dashboard/portfolio")
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                Portfolio
              </p>
            </li>
            {activeRoute("/dashboard/portfolio") ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
