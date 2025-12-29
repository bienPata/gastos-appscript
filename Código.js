const HTML_URL = 'https://raw.githubusercontent.com/bienPata/gastos-appscript/refs/heads/main/index.html';

function getHtmlContent() {
  try {
    const response = UrlFetchApp.fetch(HTML_URL, { muteHttpExceptions: true });
    if (response.getResponseCode() === 200) {
      return response.getContentText();
    }
    throw new Error('Failed to fetch HTML from GitHub');
  } catch (e) {
    return '<html><body><h1>Error loading app</h1><p>Could not fetch HTML from GitHub. Please check the URL configuration.</p><p>Error: ' + e.message + '</p></body></html>';
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('💰 Finanzas Pro')
    .addItem('Open App', 'showSidebar')
    .addItem('Open in Dialog', 'showDialog')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutput(getHtmlContent())
    .setTitle('Finanzas Pro');
  SpreadsheetApp.getUi().showSidebar(html);
}

function showDialog() {
  const html = HtmlService.createHtmlOutput(getHtmlContent())
    .setWidth(450)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, 'Finanzas Pro');
}

function doGet() {
  return HtmlService.createHtmlOutput(getHtmlContent())
    .setTitle('Finanzas Pro')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

function getConfig() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) return getDefaultConfig();

    const settingsRange = configSheet.getRange('D2:E10');
    const settings = settingsRange.getValues();
    const config = {};

    settings.forEach(row => {
      if (row[0]) config[row[0]] = row[1];
    });

    return {
      lang: config.lang || 'en',
      theme: config.theme || 'light',
      selectorStyle: config.selectorStyle || 'carousel',
      showSuggestions: config.showSuggestions !== 'false',
      categories: getCategories(),
      paymentMethods: getPaymentMethods()
    };
  } catch (e) {
    return getDefaultConfig();
  }
}

function getDefaultConfig() {
  return {
    lang: 'en',
    theme: 'light',
    selectorStyle: 'carousel',
    showSuggestions: true,
    categories: ['Food', 'Transport', 'Home'],
    paymentMethods: ['Cash', 'Card']
  };
}

function saveConfig(config) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let configSheet = ss.getSheetByName('Configuracion');

    if (!configSheet) {
      configSheet = ss.insertSheet('Configuracion');
      configSheet.getRange('A1:B1').setValues([['Categories', 'Payment Methods']]);
      configSheet.getRange('D1:E1').setValues([['Setting', 'Value']]);
    }

    const settings = [
      ['lang', config.lang],
      ['theme', config.theme],
      ['selectorStyle', config.selectorStyle],
      ['showSuggestions', config.showSuggestions]
    ];

    configSheet.getRange('D2:E5').setValues(settings);
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function addCategory(category) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) {
      configSheet = ss.insertSheet('Configuracion');
      configSheet.getRange('A1').setValue('Categories');
      configSheet.getRange('B1').setValue('Payment Methods');
    }

    const lastRow = configSheet.getLastRow();
    const categories = configSheet.getRange(2, 1, Math.max(lastRow - 1, 1), 1).getValues().flat().filter(Boolean);

    if (categories.includes(category.trim())) {
      return { success: false, message: 'Category already exists' };
    }

    configSheet.getRange(lastRow + 1, 1).setValue(category.trim());
    return { success: true, categories: getCategories() };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function removeCategory(category) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) return { success: false, message: 'Config sheet not found' };

    const lastRow = configSheet.getLastRow();
    const categories = configSheet.getRange(2, 1, lastRow - 1, 1).getValues();

    for (let i = 0; i < categories.length; i++) {
      if (categories[i][0] === category) {
        configSheet.deleteRow(i + 2);
        return { success: true, categories: getCategories() };
      }
    }
    return { success: false, message: 'Category not found' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function addPaymentMethod(method) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) {
      configSheet = ss.insertSheet('Configuracion');
      configSheet.getRange('A1').setValue('Categories');
      configSheet.getRange('B1').setValue('Payment Methods');
    }

    const lastRow = configSheet.getLastRow();
    const methods = configSheet.getRange(2, 2, Math.max(lastRow - 1, 1), 1).getValues().flat().filter(Boolean);

    if (methods.includes(method.trim())) {
      return { success: false, message: 'Payment method already exists' };
    }

    const targetRow = methods.length + 2;
    configSheet.getRange(targetRow, 2).setValue(method.trim());
    return { success: true, paymentMethods: getPaymentMethods() };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function removePaymentMethod(method) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) return { success: false, message: 'Config sheet not found' };

    const lastRow = configSheet.getLastRow();
    const data = configSheet.getRange(2, 2, lastRow - 1, 1).getValues();

    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === method) {
        configSheet.getRange(i + 2, 2).clearContent();
        return { success: true, paymentMethods: getPaymentMethods() };
      }
    }
    return { success: false, message: 'Payment method not found' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function recordExpense(formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registros') || ss.getSheets()[0];
    sheet.appendRow([
      new Date(),
      parseFloat(formData.amount),
      formData.description,
      formData.movementType,
      formData.expenseType,
      formData.paymentMethod
    ]);
    return { success: true, message: `$${formData.amount} recorded.` };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function updateRecord(id, formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registros');
    if (!sheet) return { success: false, message: 'Sheet not found' };

    const rowNum = parseInt(id);
    if (rowNum < 2) return { success: false, message: 'Invalid row' };

    sheet.getRange(rowNum, 1, 1, 6).setValues([[
      new Date(formData.date),
      parseFloat(formData.amount),
      formData.description,
      formData.movementType,
      formData.expenseType,
      formData.paymentMethod
    ]]);

    return { success: true, message: 'Record updated' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function deleteRecord(id) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registros');
    if (!sheet) return { success: false, message: 'Sheet not found' };

    const rowNum = parseInt(id);
    if (rowNum < 2) return { success: false, message: 'Invalid row' };

    sheet.deleteRow(rowNum);
    return { success: true, message: 'Record deleted' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function getAppData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registros');
    if (!sheet || sheet.getLastRow() < 2) return { records: [] };

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    return {
      records: data.map((r, i) => ({
        id: i + 2,
        fecha: Utilities.formatDate(r[0], Session.getScriptTimeZone(), "dd/MM/yyyy"),
        fechaISO: Utilities.formatDate(r[0], Session.getScriptTimeZone(), "yyyy-MM-dd"),
        monto: parseFloat(r[1]),
        desc: r[2],
        tipo: r[3],
        cat: r[4],
        pago: r[5],
        fechaRaw: r[0].getTime()
      })).reverse()
    };
  } catch (e) {
    return { records: [], error: e.toString() };
  }
}

function getUsageCounts(columnIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Registros') || ss.getSheets()[0];
  const counts = {};
  if (!sheet || sheet.getLastRow() < 2) return counts;

  sheet.getRange(2, columnIndex, sheet.getLastRow() - 1, 1)
    .getValues().flat().filter(Boolean)
    .forEach(item => {
      const key = String(item).trim();
      counts[key] = (counts[key] || 0) + 1;
    });
  return counts;
}

function getCategories() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) return ['Food', 'Transport', 'Home'];

    const lastRow = configSheet.getLastRow();
    if (lastRow < 2) return ['Food', 'Transport', 'Home'];

    const categories = configSheet.getRange(2, 1, lastRow - 1, 1)
      .getValues().flat().filter(Boolean).map(c => String(c).trim());

    if (categories.length === 0) return ['Food', 'Transport', 'Home'];

    const usage = getUsageCounts(5);
    return categories.sort((a, b) => (usage[b] || 0) - (usage[a] || 0));
  } catch (e) {
    return [];
  }
}

function getPaymentMethods() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Configuracion');
    if (!configSheet) return ['Cash', 'Card'];

    const lastRow = configSheet.getLastRow();
    if (lastRow < 2) return ['Cash', 'Card'];

    const methods = configSheet.getRange(2, 2, lastRow - 1, 1)
      .getValues().flat().filter(Boolean).map(p => String(p).trim());

    if (methods.length === 0) return ['Cash', 'Card'];

    const usage = getUsageCounts(6);
    return methods.sort((a, b) => (usage[b] || 0) - (usage[a] || 0));
  } catch (e) {
    return [];
  }
}

function getCommonDescriptions() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registros');
    if (!sheet || sheet.getLastRow() < 2) return [];

    const counts = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1)
      .getValues().flat().filter(Boolean)
      .reduce((acc, desc) => {
        const key = String(desc).trim();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 10);
  } catch (e) {
    return [];
  }
}

function getFilterOptions() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registros');
    if (!sheet || sheet.getLastRow() < 2) return { categories: [], descriptions: [] };

    const data = sheet.getRange(2, 3, sheet.getLastRow() - 1, 3).getValues();
    const categories = [...new Set(data.map(r => r[2]).filter(Boolean))];
    const descriptions = [...new Set(data.map(r => r[0]).filter(Boolean))];

    return { categories, descriptions };
  } catch (e) {
    return { categories: [], descriptions: [] };
  }
}

function getServiceUrl() {
  return ScriptApp.getService().getUrl();
}
