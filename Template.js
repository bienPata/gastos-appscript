/**
 * Template.js - User Template File
 *
 * This file goes in the user's Google Sheets Apps Script project.
 * It calls the FinanzasProLib library functions.
 *
 * Setup:
 * 1. In Apps Script, go to Libraries (+)
 * 2. Add Script ID: [YOUR_LIBRARY_SCRIPT_ID]
 * 3. Select latest version
 * 4. Identifier: FinanzasProLib
 */

const Lib = FinanzasProLib;

function onOpen() {
  Lib.onOpen();
}

function doGet() {
  return Lib.doGet();
}

function showSidebar() {
  Lib.showSidebar();
}

function showDialog() {
  Lib.showDialog();
}

function getConfig() {
  return Lib.getConfig();
}

function saveConfig(config) {
  return Lib.saveConfig(config);
}

function addCategory(category) {
  return Lib.addCategory(category);
}

function removeCategory(category) {
  return Lib.removeCategory(category);
}

function addPaymentMethod(method) {
  return Lib.addPaymentMethod(method);
}

function removePaymentMethod(method) {
  return Lib.removePaymentMethod(method);
}

function recordExpense(formData) {
  return Lib.recordExpense(formData);
}

function updateRecord(id, formData) {
  return Lib.updateRecord(id, formData);
}

function deleteRecord(id) {
  return Lib.deleteRecord(id);
}

function getAppData() {
  return Lib.getAppData();
}

function getCategories() {
  return Lib.getCategories();
}

function getPaymentMethods() {
  return Lib.getPaymentMethods();
}

function getCommonDescriptions() {
  return Lib.getCommonDescriptions();
}

function getFilterOptions() {
  return Lib.getFilterOptions();
}

function getServiceUrl() {
  return Lib.getServiceUrl();
}
