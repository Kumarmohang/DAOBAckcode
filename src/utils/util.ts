/**
 * This function checks whether value is Empty or not
 *
 * @param value test subject
 * @returns returns boolean value
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * Function to replace selectors from html docstring to it's values
 *
 * @param stringWithSelector - html template docstring
 * @param dataJson - json object with values corresponding to selectors
 * @returns output - replace selectors in html doc string with values from json object
 */
export const replaceSelectorToOriginal = (stringWithSelector: string, dataJson: Object): string => {
  return stringWithSelector.replace(/{{(.*?)}}/g, function (_, match) {
    return dataJson[match];
  });
};
