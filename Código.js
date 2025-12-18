/**
 * Web App: Registro de Gastos Móvil
 * - Funciona en móvil sin zoom
 * - Registra gastos sin redirección
 * - Botones horizontales, selección visible
 */

// --- FUNCIÓN AUXILIAR PARA CONTAR USO ---
function getUsageCounts(columnIndex) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Hoja donde se buscan los movimientos
    const logSheet = ss.getSheetByName('Registros') || ss.getSheets()[0];
    const counts = {};

    if (!logSheet || logSheet.getLastRow() < 2) {
        return counts;
    }

    // Obtener todos los valores de la columna (omitiendo el encabezado)
    const dataRange = logSheet.getRange(2, columnIndex, logSheet.getLastRow() - 1, 1);
    const values = dataRange.getValues().flat().filter(Boolean);

    values.forEach(item => {
        const key = String(item).trim();
        counts[key] = (counts[key] || 0) + 1;
    });

    return counts;
}
// ------------------------------------------

function doGet() {
    return HtmlService.createHtmlOutputFromFile('Sidebar')
        .setTitle('Registrar Gasto')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

function recordExpense(formData) {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName('Registros') || ss.getSheets()[0];
        
        if (!sheet) throw new Error("Hoja 'Gastos' no encontrada.");

        const rowData = [
            new Date(), // Columna A
            parseFloat(formData.amount), // Columna B
            formData.description, // Columna C
            formData.movementType, // Columna D
            formData.expenseType, // Columna E (Categoría)
            formData.paymentMethod // Columna F (Forma de Pago)
        ];
        
        sheet.appendRow(rowData);
        return { success: true, message: `€${formData.amount} registrado.` };

    } catch (e) {
        Logger.log("Error: " + e.toString());
        return { success: false, message: e.message || "Error al registrar." };
    }
}

function getCommonDescriptions() {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName('Registros') || ss.getSheets()[0]; 
        
        if (!sheet || sheet.getLastRow() < 2) return [];

        const DESCRIPTION_COLUMN = 3; // Columna C
        const range = sheet.getRange(2, DESCRIPTION_COLUMN, sheet.getLastRow() - 1, 1);
        const descriptions = range.getValues().flat().filter(Boolean);
        const counts = descriptions.reduce((acc, desc) => {
            const key = String(desc).trim();
            if (key) acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        
        return Object.keys(counts)
            .sort((a, b) => counts[b] - counts[a])
            .slice(0, 10);
    } catch (e) {
        Logger.log("Error descripciones: " + e.toString());
        return [];
    }
}

/**
 * Obtiene las categorías y las ordena por frecuencia de uso.
 */
function getCategories() {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const configSheet = ss.getSheetByName('Configuracion');
        if (!configSheet) throw new Error("Hoja 'Configuracion' no encontrada.");

        const lastRow = configSheet.getLastRow();
        if (lastRow < 2) return [];

        // 1. Obtener todas las categorías únicas (Columna A de 'Configuracion')
        const dataRange = configSheet.getRange(2, 1, lastRow - 1, 1);
        let categories = dataRange.getValues().flat().filter(Boolean).map(c => String(c).trim());

        // 2. Contar la frecuencia de uso en la hoja "Gastos" (Columna E, índice 5)
        const usageCounts = getUsageCounts(5); 

        // 3. ORDENAR LA LISTA
        categories.sort((a, b) => {
            const countA = usageCounts[a] || 0;
            const countB = usageCounts[b] || 0;
            return countB - countA; // Orden descendente por conteo (más usadas primero)
        });

        // 4. DEVOLVER LA LISTA ORDENADA (Este paso asegura que se devuelva el array modificado)
        return categories; 
    } catch (e) {
        Logger.log("Error al obtener categorías: " + e.toString());
        return [];
    }
}

/**
 * Obtiene las formas de pago y las ordena por frecuencia de uso.
 */
function getPaymentMethods() {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const configSheet = ss.getSheetByName('Configuracion');
        if (!configSheet) throw new Error("Hoja 'Configuracion' no encontrada.");

        const lastRow = configSheet.getLastRow();
        if (lastRow < 2) return [];

        // 1. Obtener todas las formas de pago únicas (Columna B de 'Configuracion')
        const dataRange = configSheet.getRange(2, 2, lastRow - 1, 1);
        let paymentMethods = dataRange.getValues().flat().filter(Boolean).map(p => String(p).trim());

        // 2. Contar la frecuencia de uso en la hoja "Gastos" (Columna F, índice 6)
        const usageCounts = getUsageCounts(6); 

        // 3. ORDENAR LA LISTA
        paymentMethods.sort((a, b) => {
            const countA = usageCounts[a] || 0;
            const countB = usageCounts[b] || 0;
            return countB - countA; // Orden descendente por conteo (más usadas primero)
        });

        // 4. DEVOLVER LA LISTA ORDENADA (Este paso asegura que se devuelva el array modificado)
        return paymentMethods;
    } catch (e) {
        Logger.log("Error al obtener formas de pago: " + e.toString());
        return [];
    }
}

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Gastos')
        .addItem('Abrir Formulario', 'showExpenseFormDialog')
        .addToUi();
}

function showExpenseFormDialog() {
    const html = HtmlService.createHtmlOutputFromFile('Sidebar')
        .setWidth(400)
        .setHeight(600);
    SpreadsheetApp.getUi().showModalDialog(html, 'Registrar Gasto');
}