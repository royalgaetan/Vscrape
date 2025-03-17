import { InboxItem } from "@/app/(protected)/_inbox/inbox";
import { trashItemType } from "@/app/(protected)/_trash/trash";

export const userEmail = "kabundele@gmail.com";

export const trashItems: trashItemType[] = [
  {
    type: "workflow",
    title: "Email Automation",
    subTitle: "Old marketing campaign flow",
  },
  {
    type: "chat",
    title: "Client Support - Sarah",
    subTitle: "Archived support conversation",
  },
  { type: "workflow", title: "Lead Nurturing", subTitle: "Outdated CRM flow" },
  {
    type: "chat",
    title: "Project Update - John",
    subTitle: "Weekly project discussion",
  },
  {
    type: "workflow",
    title: "Invoice Reminder",
    subTitle: "Automation for late payments",
  },
  {
    type: "chat",
    title: "Team Brainstorm",
    subTitle: "Old group chat for Q1 ideas",
  },
  {
    type: "workflow",
    title: "Survey Follow-Up",
    subTitle: "Inactive customer feedback sequence",
  },
  {
    type: "chat",
    title: "Vendor Inquiry",
    subTitle: "Chat with supplier regarding materials",
  },
  {
    type: "workflow",
    title: "Product Launch Flow",
    subTitle: "Retired campaign for V2",
  },
  {
    type: "chat",
    title: "Internal QA Discussion",
    subTitle: "Testing feedback conversation",
  },
  {
    type: "workflow",
    title: "Appointment Booking",
    subTitle: "Deprecated calendar sync flow",
  },
  {
    type: "chat",
    title: "Customer Onboarding - Alex",
    subTitle: "Welcome chat from onboarding",
  },
  {
    type: "workflow",
    title: "Blog Promotion",
    subTitle: "Old social media automation",
  },
  {
    type: "chat",
    title: "Design Review Chat",
    subTitle: "Archived UI feedback conversation",
  },
  {
    type: "workflow",
    title: "Abandoned Cart Reminder",
    subTitle: "Legacy eCommerce automation",
  },
];

export const inboxItems: InboxItem[] = [
  {
    date: new Date("2025-03-17T22:00:15"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="avatar" />
    ),
    subjectLine: "Sarah shared you access to a workflow",
    content: [
      "You have been granted access to a new workflow. Click accept to validate your access",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Eos numquam dolorem molestias architecto repudiandae aliquam corporis ipsum temporibus nesciunt minima?",
    ],
    actions: ["view", "accept", "refuse"],
    isRead: false,
    isArchived: false,
  },
  {
    date: new Date("2025-03-16T14:20:30"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: Inventory Management",
    content: [
      "The workflow execution id:40dek9JKsos2sPA failed due to this error: not enough credits.",
    ],
    actions: ["view", "retry"],
    isRead: true,
    isArchived: true,
  },
  {
    date: new Date("2025-03-15T10:15:10"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="avatar" />
    ),
    subjectLine: "Sarah shared you access to a workflow",
    content: [
      "A new workflow has been shared with you. Check it out!. ",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos numquam dolorem molestias architecto repudiandae aliquam corporis ipsum temporibus nesciunt minima? Optio recusandae voluptatibus necessitatibus impedit minus magni quidem, vel dolores. consectetur adipisicing elit.",
      "Eos numquam dolorem molestias architecto repudiandae aliquam corporis ipsum temporibus",
      "nesciunt minima? Optio recusandae voluptatibus necessitatibus impedit minus magni quidem, vel dolores",
    ],
    actions: ["view", "accept", "refuse"],
    isRead: false,
    isArchived: false,
  },
  {
    date: new Date("2025-03-17T20:10:15"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: Order Processing",
    content: ["Execution failed due to network errors. Please try again."],
    actions: ["view", "retry"],
    isRead: true,
    isArchived: false,
  },
  {
    date: new Date("2025-03-13T12:10:50"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/women/8.jpg" alt="avatar" />
    ),
    subjectLine: "Worflow access accepted",
    content: [
      "You have confirmed your access to the workflow shared by Sarah",
      "Optio recusandae voluptatibus necessitatibus impedit minus magni quidem, vel dolores. consectetur adipisicing elit.",
    ],
    actions: ["view"],
    isRead: false,
    isArchived: false,
  },
  {
    date: new Date("2025-03-12T16:00:40"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: Payment Gateway",
    content: ["The payment gateway workflow failed. Please check the logs."],
    actions: ["view", "retry"],
    isRead: true,
    isArchived: true,
  },
  {
    date: new Date("2025-03-11T09:30:25"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: User Registration",
    content: ["A failure occurred during user registration. Please review."],
    actions: ["view", "retry"],
    isRead: false,
    isArchived: true,
  },
  {
    date: new Date("2025-03-10T17:45:10"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/7.jpg" alt="avatar" />
    ),
    subjectLine: "Michael shared you access to a workflow",
    content: ["You've been granted access to a workflow related to orders."],
    actions: ["view"],
    isRead: true,
    isArchived: false,
  },
  {
    date: new Date("2025-03-09T11:20:55"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: Inventory Update",
    content: ["The workflow failed due to an error with the database."],
    actions: ["view", "retry"],
    isRead: true,
    isArchived: true,
  },
  {
    date: new Date("2025-03-08T15:50:40"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="avatar" />
    ),
    subjectLine: "Frank shared you access to a workflow",
    content: ["New workflow has been shared. Please review and proceed."],
    actions: ["view", "accept", "refuse"],
    isRead: false,
    isArchived: false,
  },
  {
    date: new Date("2025-03-07T18:25:10"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/women/4.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: Report Generation",
    content: ["Failure detected in report generation. Kindly investigate."],
    actions: ["view", "retry"],
    isRead: true,
    isArchived: false,
  },
  {
    date: new Date("2025-03-06T13:40:50"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution failed: Data Sync",
    content: [
      "The sync operation failed due to data inconsistency.",
      "Optio recusandae voluptatibus necessitatibus impedit minus magni quidem, vel dolores. consectetur adipisicing elit.",
    ],
    actions: ["view", "retry"],
    isRead: false,
    isArchived: false,
  },
  {
    date: new Date("2025-03-04T14:10:30"),
    avatar: (
      <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="avatar" />
    ),
    subjectLine: "Your workflow execution succeed: Notification System",
    content: [
      "The notification system workflow has been successfully executed.",
    ],
    actions: [],
    isRead: false,
    isArchived: true,
  },
];
