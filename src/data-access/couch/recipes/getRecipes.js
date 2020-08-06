// import { NotFoundError } from 'http-errors';
import { getDoc } from '../getDoc';

export async function getRecipe(id) {
  const doc = await getDoc(id)
  const couchFormDoc = doc
  return {
    id: couchFormDoc._id,
    rev: couchFormDoc._rev,
    ...omit(couchFormDoc, ['_id', '_rev']),
  };
}
