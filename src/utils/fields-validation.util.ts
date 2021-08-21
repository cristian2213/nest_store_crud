// global validation - return true|false
const regexValidations = {
  price: /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
};

export function positiveNumberValidation(number: number | string): any {
  const data = checkNumber(number);
  if (!data || data <= 0) return false;
  return data;
}

export function validateString(text: string): any {
  const parser = text.trim();
  const checkStart = isNaN(parseInt(parser[0]));
  if (!checkStart) {
    const subIndex = parser.slice(1);
    if (!isNaN(parseInt(subIndex))) return null;
  }
  return parser;
}

export function validatePrice(price: string): any {
  const parser = price.replace(/[,. ]/g, '');
  const num = checkNumber(parser);
  if (!num || num < 0 || !regexValidations.price.test(num.toString()))
    return null;
  if (num === 0) return false;
  return num;
  /*
status:
  - null: invalid price
  - false: price equal to cero
  - num: price
*/
}

export function checkNumber(x: number | string): number | boolean {
  if (typeof x === 'string') {
    const num = parseInt(x.trim(), 10);
    if (isNaN(num)) return false;
    return num;
  }
  if (typeof x !== 'number') return false;
  return x;
}

export function searchItem(target, stack): boolean {
  return stack.some((item) => item.id === target);
}
