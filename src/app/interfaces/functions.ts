/**
 * Solving javascripts deeply nested objects and existence of keys
 *
 * // now use it by wrapping your js object
 * const output = {deeply: { nested: { array: [] } } };
 * const array = pydict(output).get('deeply', {}).get('nested', {}).get('array', []).value();
 *
 *
 */

/**
export class pydict  {


   if(!(this instanceof pydict)) {
      return new pydict(item);
   }
   var self = this;
   self._item = item;
   self.get = function(name, def) {
       var val = self._item[name];
       return new pydict(val === undefined || val === null ? def : val);
   };
   self.value = function() {
      return self._item;
   };
   return self;
};
**/

// var obj = { a: { b: 1 } },
// a = getValue(obj, 'a.b');

/**
* Calculates the rating by model
**/
export function calculateRating(actual, potential) {
  try {
    const max = 7;  // 8 - 1 = 7
    const powa = 2; // Actual
    const powp = 3; // Potential
    let calc: number = Math.round(Math.sqrt((Math.pow(actual - 1, powa) + Math.pow(potential - 1, powp)) / (Math.pow(max, powa) + Math.pow(max, powp))) * 100);

    if (calc < 1) {
      calc = 1;
    }

    return calc;
  } catch { }
  return 1
}

export function isObjEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export const get = (o, path) => path.split('.').reduce((o = {}, key) => o[key], o);

export function getValue(object, path) {
  return path.
    replace(/\[/g, '.').
    replace(/\]/g, '').
    split('.').
    reduce((o, k) => (o || {})[k], object);
}


export function legacy_deep(obj /*, level1, level2, ... levelN*/) {
  const args = Array.prototype.slice.call(arguments, 1);
  try {
    for (let i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return false;
      }
      obj = obj[args[i]];
    }
    return true;
  } catch { return false }
}


/**
Remove all empty objects, keys, arrays
*/
export function cleanObject(obj, trim?: boolean) {

  Object.keys(obj).forEach(function(key) {
    // Get this value and its type
    let value = obj[key];
    const type = typeof value;
    console.log('Clean it ', type, key, value);
    if (type === "object") {

      // ...and remove if now "empty" (NOTE: insert your definition of "empty" here)
      if (isObjEmpty(value)) {
        delete obj[key];
      } else {
        // Recurse...
        cleanObject(value);
      }
    }
    else if (type === "undefined") {
      // Undefined, remove it
      delete obj[key];
    }
    else if (value instanceof Array && obj[key].length === 0) {
      delete obj[key];
    }
    else if (type === "string" && (value.length === 0 || value.replace(/\W/g, "") === "")) { ///\s/g
      console.log('IN FUNCTIONS weeee', key, value)
      delete obj[key];
    }
  });

  return obj;
}

// Remove for E5X objects
export function cleanE5XObject(obj) {
  try {
    Object.keys(obj).forEach(function(key) {
      // Get this value and its type
      let value = obj[key];
      const type = typeof value;
      if (type === "object") {

        if (value.hasOwnProperty('unit')) {
          if (value.hasOwnProperty('value') && !value['value']) {
            delete obj[key];
          }
        } else if (value.hasOwnProperty('plainText')) {
          if (!value['plainText'] || value['plainText'] === '') {
            delete obj[key];
          }
        }
        else {
          // Recurse...
          cleanE5XObject(value);
        }

        // ...and remove if now "empty" (NOTE: insert your definition of "empty" here)
        if (!Object.keys(value).length) {
          delete obj[key]
        }
      }
      else if (type === "undefined") {
        // Undefined, remove it
        delete obj[key];
      }
      else if (value instanceof Array && obj[key].length === 0) {
        console.log('array');
        delete obj[key];
      }
    });
  } catch { };

  return obj;
}


// Parse label for E5X from path!
export function e5xParseLabel(path) {
  let label = '';
  let tmp = path.split('.').pop().split(/(?=[A-Z])/);

  for (var idx = 0; idx < tmp.length; idx++) {

    if (tmp[idx].length === 1 && tmp[idx] === tmp[idx].toUpperCase()) {
      if ((idx - 1) > -1 && tmp[(idx - 1)].length === 1 && tmp[(idx - 1)] === tmp[(idx - 1)].toUpperCase()) {
        label += tmp[idx];
      } else {
        label = label + ' ' + tmp[idx];
      }

    } else {
      label = label + ' ' + tmp[idx];
    }
  }
  return label;
}

export function deepCopy(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}


export function titleCase(str) {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}
