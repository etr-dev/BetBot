export interface IBet {
  _id: string;
  matchId: string;
  userId: string;
  walletId: string;
  creationDate: number;
  outcome?: string;
  selectedCorner: string;
  wagerOdds: string;
  wagerAmount: number;
  amountToWin: number;
  amountToPayout: number;
  __v: number;
}
