export class PlaceBetRequest {
    matchId: string;
    userId: string;
    walletId: string;
    
    selectedCorner: string;
    wagerOdds: string;
    wagerAmount: number;
    amountToWin: number;
    amountToPayout: number;
}