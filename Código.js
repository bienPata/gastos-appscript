function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Finanzas Pro')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
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
    return { success: true, message: `$${formData.amount} registrado.` };
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
        fecha: Utilities.formatDate(r[0], "GMT-6", "dd/MM/yyyy"),
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
    if (!configSheet) return ["Comida", "Transporte", "Hogar"];

    const categories = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 1)
      .getValues().flat().filter(Boolean).map(c => String(c).trim());
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
    if (!configSheet) return ["Efectivo", "Tarjeta"];

    const methods = configSheet.getRange(2, 2, configSheet.getLastRow() - 1, 1)
      .getValues().flat().filter(Boolean).map(p => String(p).trim());
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

function getServiceUrl() {
  return ScriptApp.getService().getUrl();
}
