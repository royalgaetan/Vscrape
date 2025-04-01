import React from "react";
import WFooter from "./_components/w_footer";
import WHeader from "./_components/w_header";
import WSidebar from "./_components/w_sidebar";

const WLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-clip">
      {/* Header */}
      <WHeader />

      {/* Content */}
      <div className="flex flex-1 max-h-[88vh] h-[88vh]">
        {/* W-Sidebar */}
        <WSidebar />

        {/* W-Main */}
        <div className="flex flex-1 justify-center">{children}</div>
      </div>

      {/* Footer */}
      <WFooter />
    </div>
  );
};

export default WLayout;
