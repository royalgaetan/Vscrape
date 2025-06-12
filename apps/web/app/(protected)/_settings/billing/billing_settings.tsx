import React, { useEffect, useState } from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingItemButton from "../_components/settings_item_button";
import SettingsItemField from "../_components/settings_item_field";
import SettingsItemPaymentCard, {
  BankCard,
} from "../_components/settings_item_payment_card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingItemTable from "../_components/settings_item_table";
import { cn } from "@/lib/utils";

export type BillingHistoryType = {
  invoiceId: string;
  plan: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  date: Date;
  method: string;
  download: React.ReactNode;
};

const getDownloadBillButton = (): React.ReactNode => {
  return (
    <Button
      className="hover:opacity-80 hover:no-underline"
      size={"xs"}
      variant={"outline"}
      onClick={() => {}}
    >
      <Download className="h-4 w-4 -mr-1" />
      <span className="text-xs">PDF</span>
    </Button>
  );
};

export const userBillingHistoryData: BillingHistoryType[] = [
  {
    invoiceId: "INV-20240301-001",
    plan: "Pro Plan (Monthly)",
    amount: "$129.00",
    status: "Paid",
    date: new Date(2025, 3, 1, 15, 39),
    method: "Visa •••• 4242",
    download: getDownloadBillButton(),
  },
  {
    invoiceId: "INV-20240201-002",
    plan: "Pro Plan (Monthly)",
    amount: "$129.00",
    status: "Paid",
    date: new Date(2025, 2, 1, 15, 39),
    method: "Visa •••• 4242",
    download: getDownloadBillButton(),
  },
  {
    invoiceId: "INV-20240101-003",
    plan: "Pro Plan (Monthly)",
    amount: "$129.00",
    status: "Failed",
    date: new Date(2025, 1, 1, 15, 40),
    method: "Visa •••• 4242",
    download: getDownloadBillButton(),
  },
  {
    invoiceId: "INV-20231201-004",
    plan: "Basic Plan (Monthly)",
    amount: "$49.00",
    status: "Paid",
    date: new Date(2024, 12, 1, 15, 39),
    method: "Mastercard •••• 8745",
    download: getDownloadBillButton(),
  },
];

const bankCards: BankCard[] = [
  {
    title: "Wise",
    cardNumber: "**** **** **** 3941",
    cardholderName: "Louis Royal",
    expirationDate: "12/25",
    cardType: "Visa",
    cardNetwork: "Visa",
    isDefault: true,
  },
  {
    title: "Absa Bank",
    cardNumber: "**** **** **** 5678",
    cardholderName: "Royal GAETAN",
    expirationDate: "08/23",
    cardType: "MasterCard",
    cardNetwork: "MasterCard",
    isDefault: false,
  },
  {
    title: "MCB Bank",
    cardNumber: "**** **** **** 9876",
    cardholderName: "Louis Royal",
    expirationDate: "05/24",
    cardType: "Visa",
    cardNetwork: "Visa",
    isDefault: false,
  },
];

const BillingSettings = () => {
  const [billingHistory, setBillingHistory] = useState<BillingHistoryType[]>(
    []
  );
  const [isLoadingBillingHistory, setIsloadingBillingHistory] = useState(false);

  const getBillingHistory = async () => {
    setIsloadingBillingHistory(true);
    setBillingHistory([]);
    setTimeout(() => {
      setBillingHistory(userBillingHistoryData);
      setIsloadingBillingHistory(false);
    }, 700);
  };

  useEffect(() => {
    getBillingHistory();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-start justify-start mb-28 overflow-y-scroll scrollbar-hide">
      {/* Update Payment Method */}
      <div className="flex flex-col gap-2 w-full mt-7 pl-5 pr-7">
        <SettingDialogHeader title="Payment Methods" />
        <div className="w-full h-full pr-7">
          {/* Add / Remove Payment Methods */}
          <SettingsItemField
            title="Manage your payment methods"
            subtitle="Add, remove, or update your payment options"
            cta={
              <SettingItemButton
                text="Add a Payment Method"
                onClick={() => {}}
              />
            }
          />
        </div>
      </div>
      {/* <div className="flex flex-1 overflow-x-scroll gap-5 w-[1000px] bg-slate-700 items-center justify-center mt-7"></div> */}
      <div className="w-full max-w-full min-h-fit pr-8 overflow-x-scroll scrollbar-hide">
        <div className="gap-7 flex flex-1 mt-3 w-fit">
          {bankCards.map((card, i) => (
            <span key={card.cardNumber} className={cn(i === 0 && "ml-5")}>
              <SettingsItemPaymentCard key={`${i.toString}`} bankCard={card} />
            </span>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="flex flex-col gap-2 w-full mt-10 pl-5 pr-7">
        <SettingDialogHeader title="Billing History" />
        <div className="w-full h-full">
          {/* Upcomming charges */}
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upcoming Billing Charge</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Your next invoice is scheduled for March 31, 2025 (in 19 days)
              <br />
              The amount of $49.99 will be charged to your default payment
              method.
            </AlertDescription>
          </Alert>
        </div>

        <div className="w-full h-fit mb-44 mt-7">
          <SettingItemTable
            dataType="billingHistory"
            isLoading={isLoadingBillingHistory}
            tableCaption="All your billing history has been loaded."
            data={billingHistory}
            onRefresh={() => getBillingHistory()}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
