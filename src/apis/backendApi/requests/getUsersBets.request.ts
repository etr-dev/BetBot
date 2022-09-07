import { BetSelection } from "./enums/betSelection.enum";

export class GetUsersBetsRequest {
    userId: string;
    betSelection: BetSelection;
    attachMatchInfo?: boolean;
}