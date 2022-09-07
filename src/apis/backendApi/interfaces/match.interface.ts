import { ICornerDetails } from "./cornerDetails.interface";
import { IPostMatchInfo } from "./postMatchInfo.interface";

export interface IMatch {
  _id: string;
  eventTitle: string;
  matchTitle: string;
  link: string;
  isComplete: boolean;
  Red: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'image'>;
  Blue: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'image'>;
  postMatchInfo?: IPostMatchInfo;
  __v: 0;
}
