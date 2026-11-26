export const PORTFOLIO_URL = "https://shoaibfazeelbutt.com"
export const CONTACT_URL = "https://shoaibfazeelbutt.com/#contact"
export const PORTFOLIO_PROJECTS_URL = "https://shoaibfazeelbutt.com/#projects"
export const GITHUB_REPO_URL = "https://github.com/ShoaibFazeel/Offline-Billing-System"

export const COMPANY_DEMO = {
  companyName: "Sample Agro & Traders",
  companyAddress: "Commercial Market, Sample City",
}

export const DEMO_PRODUCTS = [
  {
    _id: "prod-1",
    productName: "CropShield Max 250EC",
    companyName: "Syngenta Agro",
    containerSize: "1 Liter",
    productPrice: 2850,
    purchasePrice: 2420,
    quantity: 18,
    hasInfiniteQuantity: false,
  },
  {
    _id: "prod-2",
    productName: "NitroGrow Granular Urea",
    companyName: "Engro Fertilizers",
    containerSize: "50 Kg Bag",
    productPrice: 4650,
    purchasePrice: 4300,
    quantity: 0,
    hasInfiniteQuantity: true,
  },
  {
    _id: "prod-3",
    productName: "RootBoost Zinc 21%",
    companyName: "FMC Crop Care",
    containerSize: "5 Kg Pack",
    productPrice: 3200,
    purchasePrice: 2790,
    quantity: 32,
    hasInfiniteQuantity: false,
  },
  {
    _id: "prod-4",
    productName: "WeedClear Herbicide",
    companyName: "Bayer CropScience",
    containerSize: "800 ml",
    productPrice: 1950,
    purchasePrice: 1680,
    quantity: 44,
    hasInfiniteQuantity: false,
  },
  {
    _id: "prod-5",
    productName: "BioPotash Liquid",
    companyName: "Tara Group",
    containerSize: "4 Liter",
    productPrice: 5400,
    purchasePrice: 4850,
    quantity: 115,
    hasInfiniteQuantity: false,
  },
  {
    _id: "prod-6",
    productName: "FungiGuard Wettable Powder",
    companyName: "Suncrop Chemicals",
    containerSize: "500 g",
    productPrice: 1480,
    purchasePrice: 1240,
    quantity: 9,
    hasInfiniteQuantity: false,
  },
]

export const DEMO_CLIENTS = [
  {
    _id: "cli-1",
    clientName: "Sample Agro Mart",
    clientNumber: "03XX-XXXXXXX",
    clientAddress: "Zone A",
    isFiler: true,
    ntnNumber: "0000000-1",
  },
  {
    _id: "cli-2",
    clientName: "Demo Seed & Supply",
    clientNumber: "03XX-XXXXXXX",
    clientAddress: "Zone B",
    isFiler: false,
    ntnNumber: "",
  },
  {
    _id: "cli-3",
    clientName: "City Agro Traders",
    clientNumber: "03XX-XXXXXXX",
    clientAddress: "Zone A",
    isFiler: true,
    ntnNumber: "0000000-2",
  },
  {
    _id: "cli-4",
    clientName: "Valley Distributors",
    clientNumber: "03XX-XXXXXXX",
    clientAddress: "Zone C",
    isFiler: false,
    ntnNumber: "",
  },
]

export const DEMO_FIELD_OFFICERS = [
  { _id: "fo-1", name: "Field Officer 1" },
  { _id: "fo-2", name: "Field Officer 2" },
]

export const DEMO_SALESMEN = [
  { _id: "sm-1", name: "Salesman 1" },
  { _id: "sm-2", name: "Salesman 2" },
]

// Simulates the SQLite client_products pricing memory table
export const DEMO_CLIENT_PRICING = {
  "cli-1": {
    "prod-1": { rate: 2800, discount: 10, extraDiscount: 2 },
    "prod-3": { rate: 3150, discount: 8, extraDiscount: 0 },
  },
  "cli-2": {
    "prod-1": { rate: 2850, discount: 5, extraDiscount: 0 },
    "prod-4": { rate: 1900, discount: 7, extraDiscount: 0 },
  },
  "cli-3": {
    "prod-2": { rate: 4600, discount: 4, extraDiscount: 1 },
    "prod-5": { rate: 5300, discount: 10, extraDiscount: 2 },
  },
}

export const INITIAL_DEMO_BILLS = [
  {
    _id: "1042",
    billId: 1042,
    clientId: "cli-1",
    clientName: "Sample Agro Mart",
    clientAddress: "Zone A",
    fieldOfficerId: "fo-1",
    salesmanId: "sm-1",
    billDate: "2026-11-26",
    totalAmount: 74916,
    items: [
      {
        _id: "i-1",
        productId: "prod-1",
        productName: "CropShield Max 250EC",
        companyName: "Syngenta Agro",
        containerSize: "1 Liter",
        quantity: 20,
        rate: 2800,
        discount: 10,
        extraDiscount: 2,
        total: 49392,
        isBonus: false,
      },
      {
        _id: "i-2",
        productId: "prod-1",
        productName: "CropShield Max 250EC",
        companyName: "Syngenta Agro",
        containerSize: "1 Liter",
        quantity: 2,
        rate: 2800,
        discount: 0,
        extraDiscount: 0,
        total: 0,
        isBonus: true,
      },
      {
        _id: "i-3",
        productId: "prod-3",
        productName: "RootBoost Zinc 21%",
        companyName: "FMC Crop Care",
        containerSize: "5 Kg Pack",
        quantity: 9,
        rate: 3150,
        discount: 10,
        extraDiscount: 0,
        total: 25515,
        isBonus: false,
      },
    ],
  },
  {
    _id: "1041",
    billId: 1041,
    clientId: "cli-3",
    clientName: "City Agro Traders",
    clientAddress: "Zone A",
    fieldOfficerId: "fo-1",
    salesmanId: "sm-2",
    billDate: "2026-11-25",
    totalAmount: 94348,
    items: [
      {
        _id: "i-4",
        productId: "prod-2",
        productName: "NitroGrow Granular Urea",
        companyName: "Engro Fertilizers",
        containerSize: "50 Kg Bag",
        quantity: 10,
        rate: 4600,
        discount: 4,
        extraDiscount: 1,
        total: 43718.4,
        isBonus: false,
      },
      {
        _id: "i-5",
        productId: "prod-5",
        productName: "BioPotash Liquid",
        companyName: "Tara Group",
        containerSize: "4 Liter",
        quantity: 10,
        rate: 5300,
        discount: 5,
        extraDiscount: 0,
        total: 50350,
        isBonus: false,
      },
    ],
  },
  {
    _id: "1040",
    billId: 1040,
    clientId: "cli-2",
    clientName: "Demo Seed & Supply",
    clientAddress: "Zone B",
    fieldOfficerId: "fo-2",
    salesmanId: "sm-1",
    billDate: "2026-11-24",
    totalAmount: 35340,
    items: [
      {
        _id: "i-6",
        productId: "prod-4",
        productName: "WeedClear Herbicide",
        companyName: "Bayer CropScience",
        containerSize: "800 ml",
        quantity: 20,
        rate: 1900,
        discount: 7,
        extraDiscount: 0,
        total: 35340,
        isBonus: false,
      },
    ],
  },
]

export const CORE_CAPABILITIES = [
  {
    id: "pricing-memory",
    badge: "Smart Rate Recall",
    title: "Client-Specific Pricing Memory",
    description:
      "Every saved invoice automatically updates a unique client-product ledger. The next time that customer orders the same item, the app pre-fills their negotiated rate, primary discount, and extra discount.",
    highlights: ["Unique (clientId, productId) index", "Stores rate, discount %, and extra discount %", "Zero manual price-book lookup"],
  },
  {
    id: "bonus-items",
    badge: "Scheme & Free Stock",
    title: "Bonus Item Accounting",
    description:
      "Wholesale schemes often include free units (e.g., 10 + 1 Free). Bonus items attach cleanly to line items, deduct real warehouse stock, appear in a dedicated PDF column, and leave invoice totals untouched.",
    highlights: ["Separate Qty & Bonus columns on PDF", "Accurate inventory deduction on bonus stock", "Reversible on bill edit or delete"],
  },
  {
    id: "bulk-billing",
    badge: "Batch Dispatch",
    title: "Atomic Bulk Bill Generation",
    description:
      "Built for daily route dispatches where one Field Officer and Salesman service multiple shops. Queue dozens of invoices under shared dispatch metadata and commit them inside a single SQLite transaction.",
    highlights: ["Shared Date, Field Officer & Salesman", "Sequential invoice ID assignment", "All-or-nothing DB transaction safety"],
  },
  {
    id: "dual-inventory",
    badge: "Stock Integrity",
    title: "Tracked & Infinite Inventory Modes",
    description:
      "Products can track exact unit counts—automatically deducting on sale and refunding when bills are edited or deleted—or run in Infinite Stock mode for made-to-order or non-counted items.",
    highlights: ["Configurable Low Stock threshold alerts", "Selling & purchase price tracking", "Company & container-size metadata"],
  },
  {
    id: "pdf-engine",
    badge: "15 × 21 cm Layout",
    title: "Custom pdf-lib Invoice & Report Engine",
    description:
      "Generates crisp, compact 410×595.3pt invoices directly in-process without browser print-dialog quirks. Includes multi-page table overflow handling, Filer NTN badges, discount mode toggle, and warranty footer.",
    highlights: ["Prints in seconds via native OS shell", "Toggle % vs PKR discount display", "Auto page breaks with carried headers"],
  },
  {
    id: "reporting",
    badge: "4 Report Engines",
    title: "Multi-Angle Sales Analytics",
    description:
      "Turn raw invoice history into actionable daily summaries: Daily Sale Reports (grouped by Area, Client, or Date), Item Reports, Item Company Reports, and Company Item Reports—each exportable to PDF.",
    highlights: ["Filter by date range, client, area & staff", "Company-level item breakdowns", "Instant totals & bonus unit summaries"],
  },
  {
    id: "field-team",
    badge: "Route Accountability",
    title: "Field Officer & Salesman Attribution",
    description:
      "Maintain dedicated directories for Field Officers and Salesmen. Bills remember the latest dispatch defaults for rapid entry and link every transaction back to the responsible field staff.",
    highlights: ["Smart defaults from the latest bill", "Keyboard-navigable entity pickers", "Staff-filtered sales reports"],
  },
  {
    id: "backup-updates",
    badge: "Operations & Safety",
    title: "Password-Gated Admin, Backup & Auto-Updates",
    description:
      "Sensitive settings sit behind an admin login: company branding for PDF headers, full JSON database export/import, selective table resets, locale/timezone config, and GitHub Releases auto-updates.",
    highlights: ["Full JSON backup & restore importer", "Electron autoUpdater via GitHub Releases", "NSIS installer & Portable .exe builds"],
  },
]

export const KEYBOARD_SHORTCUTS = [
  { keys: "Auto-Focus", scope: "All Pages", action: "Automatically focuses search or client picker on page open" },
  { keys: "↑ / ↓ + Enter", scope: "Bill Composer", action: "Navigate and select Clients, Field Officers, Salesmen & Products" },
  { keys: "Ctrl / ⌘ + A", scope: "Inventory & Clients", action: "Open Add Product or Add Client modal immediately" },
  { keys: "Ctrl / ⌘ + S", scope: "Modals & Bulk Queue", action: "Save record or commit queued batch bills" },
  { keys: "Ctrl / ⌘ + Shift + B", scope: "Bulk Billing", action: "Open a new client bill composer inside the batch queue" },
  { keys: "Ctrl / ⌘ + Shift + A", scope: "Bulk Bill Modal", action: "Open the Add Product & Bonus modal inside a bill" },
]
