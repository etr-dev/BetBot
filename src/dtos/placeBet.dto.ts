import { IsInt, IsNumber, IsNumberString, IsString } from "class-validator";

export class PlaceBetDto {
    @IsString()
    matchId: string;
    
    @IsNumberString()
    userId: string;

    @IsString()
    walletId: string;
    
    @IsString()
    selectedCorner: string;

    @IsString()
    wagerOdds: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    wagerAmount: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    amountToWin: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    amountToPayout: number;
}