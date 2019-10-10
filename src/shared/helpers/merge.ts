const accumulateObject = (acc, obj) => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'undefined' || obj[key] !== null) {
      acc[key] = obj[key];
    }
  });
};

export const merge = (obj1, obj2) => {
  const acc = {};

  accumulateObject(acc, obj1);
  accumulateObject(acc, obj2);

  return acc;
};
