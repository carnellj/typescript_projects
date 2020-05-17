import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';

const coll = new NumbersCollection([10, -333, -5, 0]);
const strings = new CharactersCollection('xXAbca');

coll.sort();
strings.sort();

console.log(coll.data);
console.log(strings.data);
