export const checkUnique = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) !== index).length === 0;
