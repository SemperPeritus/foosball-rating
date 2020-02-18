import { SelectQueryBuilder } from 'typeorm';

export const fillUpRelations = (query: SelectQueryBuilder<any>, relations: string[]) => {
  let filledUpQuery = query;

  relations.forEach(
    relation =>
      (filledUpQuery = filledUpQuery.leftJoinAndSelect(
        relation.includes('.') ? relation.replace(/s\./, '.') : `player.${relation}`,
        relation.replace(/^.*\./, '').replace(/s$/, ''),
      )),
  );

  return filledUpQuery;
};
