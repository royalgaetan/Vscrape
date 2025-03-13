import React, { useEffect, useState } from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import SettingItemButton from "../_components/settings_item_button";
import SettingsItemField from "../_components/settings_item_field";
import { ApiKeyType, WebhookType } from "@/lib/types";
import SettingItemTable from "../_components/settings_item_table";
import { Button } from "@/components/ui/button";
import { KeyRoundIcon, Webhook } from "lucide-react";

const getEditButton = (): React.ReactNode => {
  return (
    <Button
      className="hover:opacity-80 hover:no-underline px-6 justify-center items-center"
      size={"xs"}
      variant={"outline"}
      onClick={() => {}}
    >
      <span>Edit</span>
    </Button>
  );
};

const getApiKeyIcon = () => {
  return (
    <div className="pl-1">
      <KeyRoundIcon className="size-5 stroke-yellow-500" />
    </div>
  );
};

const getWebhooks = () => {
  return (
    <div className="pl-1">
      <Webhook className="size-5 stroke-red-500" />
    </div>
  );
};

export const apiKeys: ApiKeyType[] = [
  {
    icon: getApiKeyIcon(),
    name: "Main Backend Key",
    key: "pk_4r1j8b7k9n2x0zq1pk0z_7k9n2x0zq1pk_4r1j8b7k9n2x0zq1p",
    status: "Active",
    lastUsedAt: new Date(2025, 2, 13, 9, 30),
    action: getEditButton(),
  },
  {
    icon: getApiKeyIcon(),
    name: "Mobile App Key",
    key: "pk_b8m2n7d3x5q1v6r0",
    status: "Active",
    lastUsedAt: new Date(2025, 1, 28, 17, 12),
    action: getEditButton(),
  },
  {
    icon: getApiKeyIcon(),
    name: "Testing Key",
    key: "pk_test_73h2k6q9p4z8w1m3",
    status: "Revoked",
    lastUsedAt: new Date(2024, 11, 1, 15, 25),
    action: getEditButton(),
  },
];

export const webhooks: WebhookType[] = [
  {
    icon: getWebhooks(),
    name: "Order Sync",
    endpointUrl: "https://example.com/webhooks/order-sync",
    status: "Active",
    eventTriggers: ["order.created", "order.updated"],
    action: getEditButton(),
  },
  {
    icon: getWebhooks(),
    name: "User Registration",
    endpointUrl: "https://example.com/webhooks/user-register",
    status: "Active",
    eventTriggers: ["user.signup", "user.deleted"],
    action: getEditButton(),
  },
  {
    icon: getWebhooks(),
    name: "Payment Notifications",
    endpointUrl: "https://example.com/webhooks/payment-status",
    status: "Disabled",
    eventTriggers: ["payment.success", "payment.failed", "payment.refund"],
    action: getEditButton(),
  },
];

const ApiSettings = () => {
  const [apiKeysData, setApiKeysData] = useState<ApiKeyType[]>([]);
  const [isLoadingApiKeys, setLoadingApiKeys] = useState(false);

  const [webhooksData, setWebhooksData] = useState<WebhookType[]>([]);
  const [isLoadingWebhooks, setLoadingWebhooks] = useState(false);

  const getApiKeys = async () => {
    setLoadingApiKeys(true);
    setApiKeysData([]);
    setTimeout(() => {
      setApiKeysData(apiKeys);
      setLoadingApiKeys(false);
    }, 700);
  };
  const getWebhooks = async () => {
    setLoadingWebhooks(true);
    setWebhooksData([]);
    setTimeout(() => {
      setWebhooksData(webhooks);
      setLoadingWebhooks(false);
    }, 700);
  };
  useEffect(() => {
    getApiKeys();
    getWebhooks();
  }, []);

  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Connected Apps */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="APIs" />
        <div className="w-full h-full">
          <SettingsItemField
            title="API Keys"
            subtitle="Manage, add, or remove your APIs keys"
            cta={
              <SettingItemButton text="Add a new API key" onClick={() => {}} />
            }
          />

          {/* Apps Connected list */}
          <SettingItemTable
            dataType="apiKeys"
            isLoading={isLoadingApiKeys}
            tableCaption="All your API Keys have been loaded."
            data={apiKeysData}
            onRefresh={() => getApiKeys()}
          />
        </div>
      </div>

      {/* Webhook Apps */}
      <div className="flex flex-col gap-2 w-full mt-14 mb-32">
        <SettingDialogHeader title="Webhooks" />
        <div className="w-full h-full">
          <SettingsItemField
            title="Your webhooks"
            subtitle="Manage, add, or remove your different webhooks"
            cta={<SettingItemButton text="Add a webhook" onClick={() => {}} />}
          />
        </div>

        {/* Webhooks list */}
        <div className="w-full h-full">
          <SettingItemTable
            dataType="webhooks"
            isLoading={isLoadingWebhooks}
            tableCaption="All your webhooks have been loaded."
            data={webhooksData}
            onRefresh={() => getWebhooks()}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;
