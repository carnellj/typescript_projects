import { dateStringToDate } from '../utils';
import { MatchResult } from '../matchresults';
import { CsvFileReader } from './csvfilereader';

export type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResult,
  string
];

export class MatchFileReader extends CsvFileReader<MatchData> {
  constructor(filename: string) {
    super(filename);
  }

  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as MatchResult, //This is a type assertion
      row[6],
    ];
  }
}
