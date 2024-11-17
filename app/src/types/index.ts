export interface IPath {
    segments: String[];
    color?: string;
}

export type HistoryItemT = {
    letter: string;
    success: boolean;
    date: Date;
}