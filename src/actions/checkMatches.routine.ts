import { completeMatch, getEventByUrl, getIncompleteMatchLinks, getMatch } from '@apis';
import { logServer } from '@utils/log';
import { CompleteMatchRequest } from 'src/apis/backendApi/requests/completeMatch.request';

export async function checkMatches() {
    const { data: incompleteLinks } = await getIncompleteMatchLinks();                      // Get links to all incomplete events
    
    for (const link of incompleteLinks) {
        const ufcEventRes = await getEventByUrl(link);                                      // Get the current UFC Api Response for the event
        const { data: matches } = await getMatch({ link: link, isComplete: false });        // Get all incomplete matches for that event
        for (const match of matches) {
            if (ufcEventRes.fights[match.matchTitle].details.isComplete) {                  //If they have been complete then update the database
                await completeMatch(new CompleteMatchRequest(ufcEventRes, match.matchTitle));
            }
        }
  }
}
