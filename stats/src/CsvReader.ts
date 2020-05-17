import fs from 'fs';

//Composition example
export class CsvReader {
  data: string[][] = []; // This is a match data
  constructor(public fileName: string) {}

  read() {
    this.data = fs
      .readFileSync(this.fileName, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      });
  }
}
