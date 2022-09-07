import { IBet } from "../interfaces/bet.interface";
import { IMatch } from "../interfaces/match.interface";

export interface GetUsersResponse {
    message: string;
    data: BetsResponse[];
}

interface BetsResponse {
    bet: IBet;
    match?: IMatch;
}