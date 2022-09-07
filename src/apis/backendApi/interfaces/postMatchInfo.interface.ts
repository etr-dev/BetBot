import { ICornerDetails } from "./cornerDetails.interface";

export interface IPostMatchInfo {
    result: string;
    method: string;
    time: string;
    round: number;
    Red: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'image' | 'outcome'>;
    Blue: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'image' | 'outcome'>;
}