import { dateStringToDate } from './utils';
import { MatchData } from './MatchData';
import { MatchResult } from './matchresults'

export interface DataReader {
  read(): void;
  data: string[][];
}



export class MatchReader {
  matches: MatchData[] = [];
  constructor(public reader: DataReader) { }

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map(
      (row: string[]): MatchData => {
        // This is a tuple
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
    );
  }
}
