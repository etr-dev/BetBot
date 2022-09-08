import { ICornerDetails } from "./cornerDetails.interface";

export interface IPostMatchInfo {
    result: string;
    method: string;
    time: string;
    round: number;
    Red: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'odds' | 'outcome'>;
    Blue: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'odds' | 'outcome'>;
}