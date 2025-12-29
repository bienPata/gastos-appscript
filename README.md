# Finanzas Pro - Personal Expense Tracker

A mobile-first web app to track and visualize personal expenses, built with Google Apps Script using Google Sheets as a database.

![Platform](https://img.shields.io/badge/Platform-Google%20Sheets-34A853?logo=googlesheets&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

🌐 **[Leer en Español](README.es.md)**

## Features

- **Quick logging** of expenses and income from mobile
- **Customizable** categories and payment methods (add/remove in settings)
- **History** with date, category, and description filters
- **Edit and delete** records directly from history
- **Statistics** with spending chart by category
- **Dark/Light mode** with persistence
- **Multi-language** support (English/Spanish)
- **Smart suggestions** based on frequent descriptions
- **Flexible selectors** - carousel or dropdown with search
- **Auto-updates** - library-based architecture for seamless updates
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
Stores categories, payment methods, and app settings:

| Column A | Column B | Column D | Column E |
|----------|----------|----------|----------|
| Categories | Payment methods | Setting | Value |
| Food | Cash | lang | en |
| Transport | Debit card | theme | light |
| Home | Credit card | selectorStyle | carousel |
| ... | ... | showSuggestions | true |

> **Note:** You can manage categories and payment methods directly from the app settings menu.

---

## Using the App

### Log an Expense/Income
1. Enter the amount
2. Select **Expense** or **Income**
3. Type a description (or select a suggestion)
4. Choose category and payment method
5. Tap **Register**

### View History
1. Tap **HISTORY** in the bottom bar
2. Adjust start and end dates
3. Use category and description filters for refined search
4. Tap the reload button (↻)

### Edit or Delete a Record
1. In History, tap on any record
2. Modify the fields as needed
3. Tap **Save** to update or **Delete** to remove

### View Statistics
1. Tap **STATS** in the bottom bar
2. Adjust the date range
3. View income/expense summary and category chart

### App Settings
Access settings by tapping the gear icon in the header:
- **Language:** Switch between English and Spanish
- **Selector Style:** Choose carousel or dropdown with search
- **Show Suggestions:** Toggle description suggestions on/off
- **Categories:** Add or remove expense categories
- **Payment Methods:** Add or remove payment options

### Toggle Dark Mode
- Tap the sun/moon icon in the header

---

## Troubleshooting

### "Categories didn't load"
- Verify the "Configuracion" sheet exists and has data starting from row 2

### "Connection error with Google Sheets"
- Check your internet connection
- Try reloading the page

### Changes don't appear in the app
- Clear browser cache and reload
- The app auto-updates from GitHub, so no redeployment needed for UI changes

---

## For Developers

### Architecture

This project uses a **Library + Template** architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Código.js  │  │ index.html  │  │   Template.js   │  │
│  │  (Library)  │  │ (Frontend)  │  │ (User Template) │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │                  │
         ▼                  ▼
┌─────────────────┐    ┌─────────────────────────────────┐
│ Apps Script     │    │     Raw GitHub Content          │
│ Library         │◄───│  (Fetched at runtime)           │
│ (Published)     │    │                                 │
└─────────────────┘    └─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│              User's Google Sheets Copy                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Template.js │  │  Registros  │  │  Configuracion  │  │
│  │ (Thin wrap) │  │   (Data)    │  │   (Settings)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Benefits:**
- Users get updates automatically without redeploying
- HTML/CSS/JS updates are instant (fetched from GitHub)
- Backend updates require only library version bump
- User data stays in their own spreadsheet

### Project Structure

```
gastos-appscript/
├── Código.js       # Backend library (publish as Apps Script Library)
├── index.html      # Frontend (hosted on GitHub, fetched at runtime)
├── Template.js     # Thin wrapper for user's Apps Script project
├── appsscript.json
├── README.md       # English documentation
└── README.es.md    # Spanish documentation
```

### Setting Up the Library

1. **Create the Library Project:**
   - Create a new Apps Script project
   - Copy contents of `Código.js`
   - Update `HTML_URL` with your GitHub raw URL
   - Go to Project Settings → Copy Script ID

2. **Publish as Library:**
   - Deploy → New deployment → Library
   - Note the deployment ID

3. **Create the Template:**
   - Create a Google Sheet with "Registros" and "Configuracion" sheets
   - Go to Extensions → Apps Script
   - Add Library: paste your Script ID, identifier: `FinanzasProLib`
   - Copy contents of `Template.js`
   - Deploy as Web App

### Backend Functions (Código.js)

| Function | Description |
|----------|-------------|
| `doGet()` | Web App entry point |
| `getConfig()` | Gets all app settings |
| `saveConfig(config)` | Saves app settings |
| `addCategory(category)` | Adds a new category |
| `removeCategory(category)` | Removes a category |
| `addPaymentMethod(method)` | Adds a payment method |
| `removePaymentMethod(method)` | Removes a payment method |
| `recordExpense(formData)` | Records a new transaction |
| `updateRecord(id, formData)` | Updates an existing record |
| `deleteRecord(id)` | Deletes a record |
| `getAppData()` | Gets all records |
| `getCategories()` | Gets categories sorted by usage |
| `getPaymentMethods()` | Gets payment methods sorted by usage |
| `getCommonDescriptions()` | Gets top 10 most used descriptions |
| `getFilterOptions()` | Gets available filter options |

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
   - For HTML/JS changes: push to GitHub and test (auto-fetched)
   - For backend changes: use `clasp push` to library project
   - Test on both mobile and desktop

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
