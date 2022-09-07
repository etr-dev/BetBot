import { UfcEventResponse } from 'src/apis/ufcApi/responses/ufcEvent.response';
import { ICornerDetails } from '../interfaces/cornerDetails.interface';

export class CreateMatchRequest {
  constructor(ufcEvent: UfcEventResponse, selectedMatch: string) {
    this.eventTitle = ufcEvent.eventTitle;
    this.matchTitle = selectedMatch;
    this.link = ufcEvent.url;
    this.isComplete = ufcEvent.fights[selectedMatch].details.isComplete;
    const {
      name: redName,
      image: redImage,
      ...restBlue
    } = ufcEvent.fights[selectedMatch].Red;
    this.Red = { name: redName, image: redImage };

    const {
      name: blueName,
      image: blueImage,
      ...restRed
    } = ufcEvent.fights[selectedMatch].Blue;
    this.Blue = { name: blueName, image: blueImage };
  }
  eventTitle: string;
  matchTitle: string;
  link: string;
  isComplete: boolean;
  Red: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'image'>;
  Blue: Partial<ICornerDetails> & Pick<ICornerDetails, 'name' | 'image'>;
}
