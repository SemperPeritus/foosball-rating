const accumulateObject = (acc, obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
  });
};

export const merge = (...objs: object[]) => {
  const acc = {};

  objs.map(obj => accumulateObject(acc, obj));

  return acc;
};
