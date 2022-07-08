declare module 'mdtkr/schema' {
    export namespace MTData {
        export interface MTUsageData {
            complete: boolean;
            dailyCollection: DailyCollection;
            date: number;
            periodicCollBook: PeriodicCollBook;
            surveyData: SurveyData;
        }

        export interface DailyCollection {
            callLogs: CallLogs;
            complete: boolean;
            date: number;
            screenTime: number;
            sleepData: SleepData;
            usageLogs: UsageLogs;
            usageStats: UsageStats;
        }

        export interface CallLogs {
            calls: Questions;
        }

        export interface Questions {
        }

        export interface SleepData {
            end: number;
            start: number;
        }

        export interface UsageLogs {
            data: { [key: string]: Log };
        }

        export interface Log {
            first: string;
            second: number;
        }
        export interface UsageStats {
            data: { [key: string]: number };
        }

        export interface PeriodicCollBook {
            book: { [key: string]: Book };
        }

        export interface Book {
            steps: number;
            time: number;
            unlocks: number;
        }

        export interface SurveyData {
            complete: boolean;
            questions: Questions;
            time: number;
            version: number;
        }
    }
}