const accumulateObject = (acc, obj) => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'undefined' || obj[key] !== null) {
      acc[key] = obj[key];
    }
  });
};

export const merge = (...objs: object[]) => {
  const acc = {};

  objs.map(obj => accumulateObject(acc, obj));

  return acc;
};
