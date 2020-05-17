import { MatchReader } from './MatchReader';
import { CsvReader } from './CsvReader';
import { Summary } from './Summary';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { ConsoleReport } from './reportTargets/ConsoleReport';


const cvsFile = new CsvReader('football.csv');
const matchReader = new MatchReader(cvsFile);
matchReader.load();

const summary = new Summary(new WinsAnalysis("Man United"), new ConsoleReport());
const summary2 = Summary.winsAnaylsisWithHTML("Man United");

summary.buildAndReportData(matchReader.matches)
summary2.buildAndReportData(matchReader.matches)

