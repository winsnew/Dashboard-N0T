import Navbar from "../navbar";
import Sidebar from "../sidebar";
import { useState } from "react";
import Head from "next/head";

const Main = ({ children }) => {
  //   const {...rest} = props
//   const { user } = useAuth({ middleware: "auth" });
  const [open, setOpen] = useState(true);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="property-dashboard" />
      </Head>
      <div className="h-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          <main
            className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
          >
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={"Horizon UI Tailwind React"}
                // user={user}
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                {children}
              </div>
              <div className="p-3">
                
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
