export const sampleTransactions = [
  { id: 1, name: "Burger King", category: "Food & Drinks", date: "2024-12-01", amount: -2187, type: "expense", icon: "🍔", status: "completed" },
  { id: 2, name: "Arun Payment", category: "Transfer", date: "2024-12-02", amount: 39000, type: "income", icon: "💸", status: "completed" },
  { id: 3, name: "PVR Forum", category: "Shopping", date: "2024-12-03", amount: -2187, type: "expense", icon: "🎬", status: "completed" },
  { id: 4, name: "Mc Donald's, HSR", category: "Food & Drinks", date: "2024-12-04", amount: -2103, type: "expense", icon: "🍟", status: "completed" },
  { id: 5, name: "Amazon Prime", category: "Subscriptions", date: "2024-12-05", amount: -1499, type: "expense", icon: "📦", status: "completed" },
  { id: 6, name: "Netflix", category: "Subscriptions", date: "2024-12-06", amount: -649, type: "expense", icon: "📺", status: "completed" },
  { id: 7, name: "Salary Credit", category: "Income", date: "2024-12-07", amount: 85000, type: "income", icon: "💼", status: "completed" },
  { id: 8, name: "Zomato", category: "Food & Drinks", date: "2024-12-08", amount: -450, type: "expense", icon: "🛵", status: "completed" },
  { id: 9, name: "Electricity Bill", category: "Bills", date: "2024-12-09", amount: -2340, type: "expense", icon: "⚡", status: "pending" },
  { id: 10, name: "Ola Cab", category: "Transport", date: "2024-12-10", amount: -380, type: "expense", icon: "🚕", status: "completed" },
  { id: 11, name: "Swiggy", category: "Food & Drinks", date: "2024-12-11", amount: -680, type: "expense", icon: "🍱", status: "completed" },
  { id: 12, name: "Freelance Work", category: "Income", date: "2024-12-12", amount: 15000, type: "income", icon: "💻", status: "completed" },
  { id: 13, name: "D-Mart Grocery", category: "Shopping", date: "2024-12-13", amount: -3200, type: "expense", icon: "🛒", status: "completed" },
  { id: 14, name: "Mobile Recharge", category: "Bills", date: "2024-12-14", amount: -719, type: "expense", icon: "📱", status: "completed" },
  { id: 15, name: "Gym Membership", category: "Health", date: "2024-12-15", amount: -1200, type: "expense", icon: "🏋️", status: "completed" },
];

export const chartData = {
  weekly: [
    { label: "Mon", foodDrinks: 450, shopping: 0, bills: 0, income: 0 },
    { label: "Tue", foodDrinks: 680, shopping: 2187, bills: 0, income: 0 },
    { label: "Wed", foodDrinks: 380, shopping: 0, bills: 0, income: 39000 },
    { label: "Thu", foodDrinks: 2103, shopping: 0, bills: 0, income: 0 },
    { label: "Fri", foodDrinks: 1499, shopping: 0, bills: 0, income: 0 },
    { label: "Sat", foodDrinks: 649, shopping: 0, bills: 0, income: 85000 },
    { label: "Sun", foodDrinks: 3200, shopping: 0, bills: 2340, income: 0 },
  ],
  monthly: [
    { label: "Nov 05", foodDrinks: 3200, shopping: 1500, bills: 2100, income: 15000 },
    { label: "Nov 08", foodDrinks: 1800, shopping: 4200, bills: 800, income: 0 },
    { label: "Nov 12", foodDrinks: 4500, shopping: 2100, bills: 1200, income: 39000 },
    { label: "Nov 16", foodDrinks: 2200, shopping: 800, bills: 3400, income: 0 },
    { label: "Nov 20", foodDrinks: 3800, shopping: 3200, bills: 900, income: 85000 },
    { label: "Nov 24", foodDrinks: 5100, shopping: 1100, bills: 2200, income: 0 },
    { label: "Nov 28", foodDrinks: 2900, shopping: 5400, bills: 1500, income: 15000 },
    { label: "Dec 01", foodDrinks: 4200, shopping: 2800, bills: 2800, income: 0 },
    { label: "Dec 04", foodDrinks: 6800, shopping: 900, bills: 3100, income: 39000 },
    { label: "Dec 08", foodDrinks: 3100, shopping: 4100, bills: 1800, income: 0 },
  ],
  threeMonth: [
    { label: "Oct W1", foodDrinks: 8200, shopping: 4500, bills: 3100, income: 85000 },
    { label: "Oct W2", foodDrinks: 6800, shopping: 7200, bills: 2800, income: 15000 },
    { label: "Oct W3", foodDrinks: 9400, shopping: 3100, bills: 4200, income: 0 },
    { label: "Oct W4", foodDrinks: 7100, shopping: 8900, bills: 3600, income: 39000 },
    { label: "Nov W1", foodDrinks: 5600, shopping: 4200, bills: 2100, income: 85000 },
    { label: "Nov W2", foodDrinks: 8900, shopping: 6100, bills: 3800, income: 0 },
    { label: "Nov W3", foodDrinks: 7200, shopping: 3800, bills: 2400, income: 39000 },
    { label: "Nov W4", foodDrinks: 6400, shopping: 9200, bills: 4100, income: 15000 },
  ],
  year: [
    { label: "Jan", foodDrinks: 18000, shopping: 12000, bills: 9000, income: 100000 },
    { label: "Feb", foodDrinks: 15000, shopping: 8000, bills: 8500, income: 85000 },
    { label: "Mar", foodDrinks: 22000, shopping: 14000, bills: 9200, income: 95000 },
    { label: "Apr", foodDrinks: 19000, shopping: 11000, bills: 8800, income: 85000 },
    { label: "May", foodDrinks: 24000, shopping: 16000, bills: 9500, income: 100000 },
    { label: "Jun", foodDrinks: 17000, shopping: 9000, bills: 8200, income: 85000 },
    { label: "Jul", foodDrinks: 21000, shopping: 13000, bills: 9800, income: 92000 },
    { label: "Aug", foodDrinks: 26000, shopping: 18000, bills: 10200, income: 85000 },
    { label: "Sep", foodDrinks: 20000, shopping: 15000, bills: 9100, income: 88000 },
    { label: "Oct", foodDrinks: 23000, shopping: 12000, bills: 9400, income: 85000 },
    { label: "Nov", foodDrinks: 28000, shopping: 20000, bills: 10800, income: 100000 },
    { label: "Dec", foodDrinks: 31000, shopping: 22000, bills: 11200, income: 85000 },
  ],
};

export const categories = [
  "Food & Drinks", "Shopping", "Transport", "Bills", "Subscriptions", "Health", "Income", "Transfer", "Other"
];

export const bills = [
  { id: 1, name: "Electricity Bill", provider: "BESCOM", amount: 2340, dueDate: "2024-12-20", status: "pending", icon: "⚡", category: "Utilities" },
  { id: 2, name: "Internet Bill", provider: "Jio Fiber", amount: 999, dueDate: "2024-12-18", status: "paid", icon: "📡", category: "Utilities" },
  { id: 3, name: "Netflix", provider: "Netflix Inc.", amount: 649, dueDate: "2024-12-25", status: "pending", icon: "📺", category: "Subscriptions" },
  { id: 4, name: "Amazon Prime", provider: "Amazon", amount: 1499, dueDate: "2024-12-28", status: "paid", icon: "📦", category: "Subscriptions" },
  { id: 5, name: "Gym Membership", provider: "Cult.fit", amount: 1200, dueDate: "2024-12-15", status: "paid", icon: "🏋️", category: "Health" },
  { id: 6, name: "Water Bill", provider: "BWSSB", amount: 480, dueDate: "2024-12-22", status: "pending", icon: "💧", category: "Utilities" },
];
