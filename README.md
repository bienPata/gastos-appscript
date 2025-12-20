# Finanzas Pro - Personal Expense Tracker

A mobile-first web app to track and visualize personal expenses, built with Google Apps Script using Google Sheets as a database.

![Platform](https://img.shields.io/badge/Platform-Google%20Sheets-34A853?logo=googlesheets&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Quick logging** of expenses and income from mobile
- **Customizable** categories and payment methods
- **History** with date filters
- **Statistics** with spending chart by category
- **Dark/Light mode** with persistence
- **Smart suggestions** based on frequent descriptions
- **100% free** - uses your own Google account

---

## User Guide

### Step 1: Copy the Template

1. Open the original template:
   **[Open Template](https://docs.google.com/spreadsheets/d/1KNayGWB7jz5z_GGd9TvdqYkzPfHTZlnCwBebvFPI22w/copy)**

2. A dialog will appear asking to make a copy. Click **"Make a copy"**

3. The copy will be saved to your Google Drive

> **Note:** The `/copy` link automatically prompts you to create your own copy.

### Step 2: Deploy the Web App

1. In your spreadsheet copy, go to **Extensions → Apps Script**

2. In the Apps Script editor, click **Deploy → New deployment**

3. Configure the deployment:
   - **Type:** Select "Web app"
   - **Description:** (optional) e.g., "My expense tracker"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone" (to access from mobile)

4. Click **Deploy**

5. **Authorize permissions:**
   - Click "Authorize access"
   - Select your Google account
   - Click "Advanced" → "Go to Finanzas Pro (unsafe)"
   - Click "Allow"

6. **Copy your URL!** This is your personal app address

### Step 3: Access from Mobile

1. Copy your Web App URL
2. On your phone, paste the URL in your browser
3. **Recommended:** Add to home screen:
   - **iPhone:** Safari → Share → "Add to Home Screen"
   - **Android:** Chrome → Menu (⋮) → "Add to Home Screen"

---

## Spreadsheet Structure

### "Registros" Sheet
Where all transactions are stored:

| Column | Content |
|--------|---------|
| A | Date/Time |
| B | Amount |
| C | Description |
| D | Type (Compra/Ingreso) |
| E | Category |
| F | Payment method |

### "Configuracion" Sheet
Defines available options:

| Column A | Column B |
|----------|----------|
| Categories | Payment methods |
| Food | Cash |
| Transport | Debit card |
| Home | Credit card |
| ... | ... |

> **Customize** by adding or removing rows to adapt categories and payment methods to your needs.

---

## Using the App

### Log an Expense/Income
1. Enter the amount
2. Select **Gasto** (expense) or **Ingreso** (income)
3. Type a description (or select a suggestion)
4. Choose category and payment method
5. Tap **Registrar**

### View History
1. Tap **HISTORIAL** in the bottom bar
2. Adjust start and end dates
3. Tap the reload button (↻)

### View Statistics
1. Tap **STATS** in the bottom bar
2. Adjust the date range
3. View income/expense summary and category chart

---

## Troubleshooting

### "Categories didn't load"
- Verify the "Configuracion" sheet exists and has data starting from row 2

### "Connection error with Google Sheets"
- Check your internet connection
- Try reloading the page

### Changes don't appear in the app
- If you modified the code, you need to create a **new deployment**
- Go to Apps Script → Deploy → Manage deployments → New version

---

## For Developers

### Requirements
- Google account
- Basic JavaScript knowledge
- (Optional) [clasp](https://github.com/google/clasp) for local development

### Project Structure

```
gastos-appscript/
├── Código.js       # Backend - Google Apps Script
├── index.html      # Frontend - HTML/CSS/JS
├── appsscript.json
└── README.md
```

### Local Development with clasp

1. **Install clasp globally:**
```bash
npm install -g @google/clasp
```

2. **Login:**
```bash
clasp login
```

3. **Clone the project:**
```bash
clasp clone <SCRIPT_ID>
```
> Script ID is in Apps Script → Project Settings

4. **Push changes:**
```bash
clasp push
```

5. **Open in browser:**
```bash
clasp open
```

### Backend Functions (Código.js)

| Function | Description |
|----------|-------------|
| `doGet()` | Web App entry point |
| `recordExpense(formData)` | Records a new transaction |
| `getAppData()` | Gets all records |
| `getCategories()` | Gets categories sorted by usage |
| `getPaymentMethods()` | Gets payment methods sorted by usage |
| `getCommonDescriptions()` | Gets top 10 most used descriptions |
| `getUsageCounts(columnIndex)` | Helper to count usage frequency |

### Contributing

1. **Fork** this repository

2. **Clone** your fork:
```bash
git clone https://github.com/YOUR_USERNAME/gastos-appscript.git
cd gastos-appscript
```

3. **Create a branch** for your feature:
```bash
git checkout -b feature/new-feature
```

4. **Develop and test** your changes:
   - Use `clasp push` to upload to test script
   - Create a test deployment
   - Verify it works on mobile and desktop

5. **Commit** with descriptive messages:
```bash
git add .
git commit -m "feat: add CSV export"
```

6. **Push** to your fork:
```bash
git push origin feature/new-feature
```

7. **Open a Pull Request** describing:
   - What problem it solves
   - How to test it
   - Screenshots if there are visual changes

### Code Style

- **No unnecessary comments** - code should be self-explanatory
- **Descriptive names** for functions and variables
- **Small functions** with single responsibility
- **ES6+** - use `const`, `let`, arrow functions, template literals
- **Consistency** - follow existing code style

### Updating an Existing Deployment

When a PR with improvements is merged:

1. Go to your Google Sheets copy
2. **Extensions → Apps Script**
3. Replace contents of `Código.gs` and `index.html` with updated code
4. **Deploy → Manage deployments**
5. Edit existing deployment or create new one
6. If new, update the URL on your phone

---

## License

MIT License - Use, modify, and share freely.

---

## Credits

Built with ❤️ using:
- [Google Apps Script](https://developers.google.com/apps-script)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [Inter Font](https://rsms.me/inter)
