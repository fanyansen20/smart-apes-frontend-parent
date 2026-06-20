export const transactionType = [
  { label: "Withdrawal", query: "withdrawal" },
  { label: "Refunded", query: "refunded" },
];

export const transactionStatus = [
  { label: "Pending", query: "pending" },
  { label: "Completed", query: "completed" },
  { label: "Failed", query: "failed" },
];

export const transactionFilter = [
  { label: "Amount High to Low", query: "amount:desc" },
  { label: "Amount Low to High", query: "amount:asc" },
  { label: "Time Newest to Oldest", query: "created_at:desc" },
  { label: "Time Oldest to Newest", query: "created_at:asc" },
];
