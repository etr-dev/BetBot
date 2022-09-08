import { UfcEventResponse } from "src/apis/ufcApi/responses/ufcEvent.response";
import { IPostMatchInfo } from "../interfaces/postMatchInfo.interface";

export class CompleteMatchRequest {
    constructor(ufcEvent: UfcEventResponse, selectedMatch: string) {
        this.eventTitle = ufcEvent.eventTitle;
        this.matchTitle = selectedMatch;
        
        const match = ufcEvent.fights[selectedMatch];
        const postMatchInfo = {
            result: match.details.result,
            method: match.details.method,
            time: match.details.time,
            round: match.details.round,
            Red: {
                name: match.Red.name,
                odds: match.Red.odds,
                outcome: match.Red.outcome,
            },
            Blue: {
                name: match.Blue.name,
                odds: match.Blue.odds,
                outcome: match.Blue.outcome,
            }
        };

        this.postMatchInfo = postMatchInfo;
      }
    eventTitle: string;
    matchTitle: string;
    postMatchInfo: IPostMatchInfo;
}