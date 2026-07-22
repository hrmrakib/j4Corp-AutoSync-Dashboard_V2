import type {
  User,
  StatsCardData,
  Notification,
  ChartDataPoint,
  RegisteredUnit,
  SidebarItem,
  Appointment,
  ChatContact,
  ChatMessage,
  SellRequest,
  Document,
} from "@/types";

export const mockCurrentUser = {
  name: "Sharon",
  email: "sharon@example.com",
  avatarUrl: "/avatar_sharon.png", // fallback or generated image
};

// =============================================================================
// Sidebar Navigation Items
// =============================================================================

export const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", href: "/", iconName: "dashboard" },
  { name: "User", href: "/users", iconName: "user" },
  { name: "Inbox", href: "/inbox", iconName: "inbox" },
  { name: "Appointment", href: "/appointments", iconName: "appointment" },
  { name: "Sell Request", href: "/sell-request", iconName: "sellRequest" },
  { name: "AI", href: "/ai", iconName: "ai" },
  { name: "Settings", href: "/settings", iconName: "settings" },
];

// =============================================================================
// Dashboard Stats Cards
// =============================================================================

export const mockStats: StatsCardData[] = [
  {
    id: "stat-1",
    title: "Total Users",
    value: "1,235",
  },
  {
    id: "stat-2",
    title: "Appointments Today",
    value: "15",
  },
  {
    id: "stat-3",
    title: "Sale Request Today",
    value: "5",
  },
];

// =============================================================================
// Chart Data (Jan–Jul)
// =============================================================================

export const mockChartData: ChartDataPoint[] = [
  { month: "Jan", thisMonth: 5_000_000, lastMonth: 3_000_000 },
  { month: "Feb", thisMonth: 9_000_000, lastMonth: 7_500_000 },
  { month: "Mar", thisMonth: 12_000_000, lastMonth: 18_256_598 },
  { month: "Apr", thisMonth: 15_000_000, lastMonth: 14_000_000 },
  { month: "May", thisMonth: 18_000_000, lastMonth: 13_000_000 },
  { month: "Jun", thisMonth: 17_500_000, lastMonth: 15_500_000 },
  { month: "Jul", thisMonth: 20_000_000, lastMonth: 17_000_000 },
];

// =============================================================================
// Users
// =============================================================================

export const mockUsers: User[] = [
  {
    id: "u-1",
    name: "ASOS Ridley High Waist",
    email: "kenzi.lawson@example.com",
    phone: "(225) 555-0118",
    address: "775 Rolling Green Rd.",
    birthday: "5/7/16",
    zipCode: "492",
  },
  {
    id: "u-2",
    name: "Marco Lightweight Shirt",
    email: "dolores.chambers@example.com",
    phone: "(207) 555-0119",
    address: "3890 Poplar Dr.",
    birthday: "10/6/13",
    zipCode: "492",
  },
  {
    id: "u-3",
    name: "Half Sleeve Shirt",
    email: "georgia.young@example.com",
    phone: "(629) 555-0129",
    address: "7529 E. Pecan St.",
    birthday: "5/27/15",
    zipCode: "492",
  },
  {
    id: "u-4",
    name: "Lightweight Jacket",
    email: "sara.cruz@example.com",
    phone: "(201) 555-0124",
    address: "8080 Railroad St.",
    birthday: "7/27/13",
    zipCode: "492",
  },
  {
    id: "u-5",
    name: "Marco Shoes",
    email: "nevaeh.simmons@example.com",
    phone: "(308) 555-0121",
    address: "8558 Green Rd.",
    birthday: "9/4/12",
    zipCode: "492",
  },
  {
    id: "u-6",
    name: "Marco Shoes",
    email: "jackson.graham@example.com",
    phone: "(319) 555-0115",
    address: "3890 Poplar Dr.",
    birthday: "12/10/13",
    zipCode: "492",
  },
  {
    id: "u-7",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-8",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-9",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-10",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-11",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-12",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-13",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-14",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-15",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-16",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-17",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-18",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-19",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
  {
    id: "u-20",
    name: "Marco Shoes",
    email: "alma.lawson@example.com",
    phone: "(316) 555-0116",
    address: "3605 Parker Rd.",
    birthday: "8/2/19",
    zipCode: "492",
  },
];

// =============================================================================
// Notifications
// =============================================================================

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

// =============================================================================
// Registered Units (Vehicles)
// =============================================================================

export const mockRegisteredUnits: RegisteredUnit[] = [
  {
    id: "ru-1",
    make: "BMW",
    model: "G0310R",
    year: 2025,
    vin: "1HGBH41JXMN109186",
    purchaseDate: "11 January 2025",
    storeName: "BMG Xtreme Sports",
    imageUrl: "/motorcycle.png",
  },
  {
    id: "ru-2",
    make: "BMW",
    model: "G0310R",
    year: 2025,
    vin: "1HGBH41JXMN109186",
    purchaseDate: "11 January 2025",
    storeName: "BMG Xtreme Sports",
    imageUrl: "/motorcycle.png",
  },
];

// =============================================================================
// Appointments
// =============================================================================

export const mockAppointments: Appointment[] = [
  {
    id: "a-1",
    name: "Ralph Edwards",
    email: "willie.jennings@example.com",
    zipCode: "0254158",
    make: "Lorem ipsum",
    model: "Lorem ipsum",
    year: 2024,
    service: "YER 20,000",
    location: "Lorem ipsum",
    date: "24 August 2025",
    servicedBefore: "Yes",
  },
  {
    id: "a-2",
    name: "Marco Lightweight Shirt",
    email: "dolores.chambers@example.com",
    zipCode: "492",
    make: "dolores.chambers@example.com",
    model: "(207) 555-0119",
    year: 2023,
    service: "YER 10,000",
    location: "3890 Poplar Dr.",
    date: "10/6/13",
    servicedBefore: "No",
  },
  {
    id: "a-3",
    name: "Half Sleeve Shirt",
    email: "georgia.young@example.com",
    zipCode: "492",
    make: "georgia.young@example.com",
    model: "(629) 555-0129",
    year: 2022,
    service: "YER 15,000",
    location: "7529 E. Pecan St.",
    date: "5/27/15",
    servicedBefore: "Yes",
  },
  {
    id: "a-4",
    name: "Lightweight Jacket",
    email: "sara.cruz@example.com",
    zipCode: "492",
    make: "sara.cruz@example.com",
    model: "(201) 555-0124",
    year: 2025,
    service: "YER 25,000",
    location: "8080 Railroad St.",
    date: "7/27/13",
    servicedBefore: "No",
  },
];

// =============================================================================
// Chat Contacts & Messages
// =============================================================================

export const mockContacts: ChatContact[] = [
  {
    id: "c-1",
    name: "Jennifer Markus",
    avatarUrl: "/avatar.png",
    lastMessage: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
    lastMessageTime: "Today | 05:30 PM",
    isOnline: true,
  },
  {
    id: "c-2",
    name: "Iva Ryan",
    avatarUrl: "/avatar.png",
    lastMessage: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
    lastMessageTime: "Today | 05:30 PM",
  },
  {
    id: "c-3",
    name: "Jerry Helfer",
    avatarUrl: "/avatar.png",
    lastMessage: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
    lastMessageTime: "Today | 05:30 PM",
  },
  {
    id: "c-4",
    name: "David Elson",
    avatarUrl: "/avatar.png",
    lastMessage: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
    lastMessageTime: "Today | 05:30 PM",
  },
  {
    id: "c-5",
    name: "Mary Freund",
    avatarUrl: "/avatar.png",
    lastMessage: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
    lastMessageTime: "Today | 05:30 PM",
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: "m-1",
    contactId: "c-1",
    sender: "contact",
    text: "Oh, hello! All perfectly. I will check it and get back to you soon",
    time: "04:45 PM",
  },
  {
    id: "m-2",
    contactId: "c-1",
    sender: "user",
    text: "Oh, hello! All perfectly. I will check it and get back to you soon",
    time: "04:45 PM",
  },
  {
    id: "m-3",
    contactId: "c-1",
    sender: "contact",
    text: "Oh, hello! All perfectly. I will check it and get back to you soon",
    time: "04:45 PM",
  },
  {
    id: "m-4",
    contactId: "c-1",
    sender: "user",
    text: "Oh, hello! All perfectly. I will check it and get back to you soon",
    time: "04:45 PM",
  },
];

// =============================================================================
// Sell Requests
// =============================================================================

export const mockSellRequests: SellRequest[] = [
  {
    id: "sr-1",
    name: "ASOS Ridley High Waist",
    email: "kenzi.lawson@example.com",
    make: "kenzi.lawson@example.com",
    model: "(225) 555-0118",
    year: 2025,
    vin: "0254158",
    color: "Black",
    miles: "Lorem ipsum",
    loanLineholder: "Lorem ipsum",
    payoffBalance: "Lorem ipsum",
    overallCondition: "Lorem ipsum",
    additionalParts: "Lorem ipsum",
    details: "Lorem ipsum",
    imageUrl: "/motorcycle.png",
  },
  {
    id: "sr-2",
    name: "Marco Lightweight Shirt",
    email: "dolores.chambers@example.com",
    make: "dolores.chambers@example.com",
    model: "(207) 555-0119",
    year: 2025,
    vin: "1234567",
    color: "Black",
    miles: "15,000",
    loanLineholder: "N/A",
    payoffBalance: "$0",
    overallCondition: "Good",
    additionalParts: "None",
    details: "Regular maintenance",
    imageUrl: "/motorcycle.png",
  },
  {
    id: "sr-3",
    name: "Half Sleeve Shirt",
    email: "georgia.young@example.com",
    make: "georgia.young@example.com",
    model: "(629) 555-0129",
    year: 2025,
    vin: "9876543",
    color: "Black",
    miles: "8,000",
    loanLineholder: "Chase Auto",
    payoffBalance: "$5,000",
    overallCondition: "Excellent",
    additionalParts: "Upgraded exhaust",
    details: "No scratches",
    imageUrl: "/motorcycle.png",
  },
  {
    id: "sr-4",
    name: "Lightweight Jacket",
    email: "sara.cruz@example.com",
    make: "sara.cruz@example.com",
    model: "(201) 555-0124",
    year: 2025,
    vin: "5551234",
    color: "Black",
    miles: "22,000",
    loanLineholder: "Bank of America",
    payoffBalance: "$2,500",
    overallCondition: "Fair",
    additionalParts: "Custom seat",
    details: "Minor dent on tank",
    imageUrl: "/motorcycle.png",
  },
  {
    id: "sr-5",
    name: "Marco Shoes",
    email: "nevaeh.simmons@example.com",
    make: "nevaeh.simmons@example.com",
    model: "(308) 555-0121",
    year: 2025,
    vin: "1112223",
    color: "Black",
    miles: "500",
    loanLineholder: "N/A",
    payoffBalance: "$0",
    overallCondition: "Like New",
    additionalParts: "None",
    details: "Barely ridden",
    imageUrl: "/motorcycle.png",
  },
];

// =============================================================================
// Documents (AI Page)
// =============================================================================

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
