import type {
  Notification,
  SidebarItem,
  Document,
} from "@/types";

export const mockCurrentUser = {
  name: "Sharon",
  email: "sharon@example.com",
  avatarUrl: "/avatar_sharon.png", // fallback or generated image
};



export const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/", iconName: "dashboard" },
  { name: "User", href: "/users", iconName: "user" },
  { name: "Inbox", href: "/inbox", iconName: "inbox" },
  { name: "Appointment", href: "/appointments", iconName: "appointment" },
  { name: "Sell Request", href: "/sell-request", iconName: "sellRequest" },
  { name: "AI", href: "/ai", iconName: "ai" },
  { name: "Settings", href: "/setting", iconName: "settings" },
];

export const mockNotifications: Notification[] = [
  {
    id: "n-1",
    title: "New Appointment Scheduled",
    message:
      "You have a new service appointment for the Honda Civic (VIN: 1HGBH41JXMN109186) scheduled for March 5, 2025",
    time: "Just now",
    read: false,
    type: "appointment",
  },
  {
    id: "n-2",
    title: "New Appointment Scheduled",
    message:
      "You have a new service appointment for the Honda Civic (VIN: 1HGBH41JXMN109186) scheduled for March 5, 2025",
    time: "Just now",
    read: false,
    type: "appointment",
  },
  {
    id: "n-3",
    title: "New Appointment Scheduled",
    message:
      "You have a new service appointment for the Honda Civic (VIN: 1HGBH41JXMN109186) scheduled for March 5, 2025",
    time: "Just now",
    read: false,
    type: "appointment",
  },
  {
    id: "n-4",
    title: "Sale Request Received",
    message: "A new sale request has been submitted for review. Please check the details.",
    time: "5 min ago",
    read: true,
    type: "sale",
  },
  {
    id: "n-5",
    title: "System Update",
    message: "The system has been updated to the latest version. No action required.",
    time: "1 hour ago",
    read: true,
    type: "system",
  },
];

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Document.pdf",
    type: "pdf",
  },
  {
    id: "doc-2",
    name: "Document.pdf",
    type: "pdf",
  },
  {
    id: "doc-3",
    name: "Document.pdf",
    type: "pdf",
  },
];
