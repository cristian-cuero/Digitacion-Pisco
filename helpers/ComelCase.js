function convertKeysToCamelCaseIfHasUnderscore(obj) {
    const newObj = {};
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
  
      if (key.includes('_')) {
        // Convertir a camelCase
        const parts = key.split('_');
        const camelKey = parts[0] + parts.slice(1)
          .map(p => p.charAt(0).toUpperCase() + p.slice(1))
          .join('');
        newObj[camelKey] = obj[key];
      } else {
        // Dejar igual si no tiene guion
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }


  module.exports = {
    convertKeysToCamelCaseIfHasUnderscore
  }
  