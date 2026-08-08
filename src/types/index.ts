// =============================================================================
// Type definitions for the J4Crop AutoSync Dashboard
// =============================================================================

/** Represents a user in the system */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  zipCode: string;
}

/** Stats card data displayed on the dashboard */
export interface StatsCardData {
  id: string;
  title: string;
  value: string;
  /** Optional trend percentage (positive = up, negative = down) */
  trend?: number;
}

/** A single notification item */
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "appointment" | "sale" | "system";
}

/** A single data point for the line chart */
export interface ChartDataPoint {
  month: string;
  thisMonth: number;
  lastMonth: number;
}

/** A registered vehicle/unit */
export interface RegisteredUnit {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  purchaseDate: string;
  storeName: string;
  imageUrl: string;
}

/** Sidebar navigation item */
export interface SidebarItem {
  name: string;
  href: string;
  /** Icon identifier used to look up the correct SVG component */
  iconName: string;
}

/** Toast notification variant */
export type ToastVariant = "success" | "error" | "info" | "warning";

/** A toast notification message */
export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
}

/** Chart tab options */
export type ChartTab = "totalUsers" | "appointments";

/** Represents an appointment returned by the API */
export interface Appointment {
  id: number;
  unit: number;
  full_name: string;
  email: string;
  model_name: string;
  location: string;
  appointment_date: string;
  details: string;
  has_serviced_before: boolean;
  created_at: string;
  updated_at: string;
}

/** Represents a contact in the Inbox */
export interface ChatContact {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  isOnline?: boolean;
}

/** Represents a single message in a chat */
export interface ChatMessage {
  id: string;
  contactId: string;
  sender: "user" | "contact";
  text: string;
  time: string;
}

/** Represents a sell request */
export interface SellRequest {
  id: string;
  name: string;
  email: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  miles: string;
  loanLineholder: string;
  payoffBalance: string;
  overallCondition: string;
  additionalParts: string;
  details: string;
  imageUrl: string;
}

/** Represents a document in the AI page */
export interface Document {
  id: string;
  name: string;
  type: "pdf" | "doc" | "image";
}
