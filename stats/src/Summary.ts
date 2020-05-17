import { MatchData } from './MatchData'
import { WinsAnalysis } from './analyzers/WinsAnalysis'
import { HTMLReport } from './reportTargets/HTMLReport'
export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) { }

  //static methods
  static winsAnaylsisWithHTML(team: string): Summary {
    return new Summary(new WinsAnalysis(team), new HTMLReport());
  }

  buildAndReportData(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}