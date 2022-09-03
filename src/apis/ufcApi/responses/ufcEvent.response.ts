export interface UfcApiResponse {
    message: string;
    data: UfcEventResponse;
}
  
export interface UfcEventResponse {
    eventTitle: string;
    url: string;
    date: string;
    image: string;
    fights: MatchListResponse;
}

export interface MatchListResponse {
    [key: string]: UfcMatchResponse
}

export interface UfcMatchResponse {
    details: DetailsResponse;
    Red: FighterResponse;
    Blue: FighterResponse;
}

export interface DetailsResponse {
    link: string;
    isLive: boolean;
    isComplete: boolean;
    method: string;
    round: number;
    result: string;
}

export interface FighterResponse {
    name: string;
    odds: string;
    outcome: string;
    image: string;
}