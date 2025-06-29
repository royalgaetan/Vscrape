import React from "react";
import WFooter from "./_components/w_footer";
import WHeader from "./_components/w_header";
import SelectInputDataDialog from "../../components/dialogs/select_input_data_dialog";

const WLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-clip">
      {/* Header */}
      <WHeader />
      {/* Content */}
      <div className="flex flex-1 max-h-[88vh] h-[88vh]">{children}</div>
      {/* Footer */}
      <WFooter />
      {/* Dialogs */}
      <SelectInputDataDialog />
    </div>
  );
};

export default WLayout;
