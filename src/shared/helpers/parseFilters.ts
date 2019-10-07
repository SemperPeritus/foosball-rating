// GET request example: ?filter=foo,bar=x
// Return example : { foo: true, bar: 'x' }

const parseFilters = (filter: string) => {
  const filterList = filter && filter.split(',');
  const preparedMap = filterList.map(item => item.split(':'));

  return preparedMap.reduce((acc, item) => {
    acc[item[0]] = item[1] || true;
    return acc;
  }, {});
};
