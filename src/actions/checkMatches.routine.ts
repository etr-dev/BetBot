import { completeMatch, getEventByUrl, getIncompleteMatchLinks, getMatch } from '@apis';
import { logServer } from '@utils/log';
import { CompleteMatchRequest } from 'src/apis/backendApi/requests/completeMatch.request';

export async function checkMatches() {
  logServer('cum');
  const { data: incompleteLinks } = await getIncompleteMatchLinks();
    for (const link of incompleteLinks) {
        const ufcEventRes = await getEventByUrl(link);
        const { data: matches } = await getMatch({ link: link, isComplete: false });
        for (const match of matches) {
            if (ufcEventRes.fights[match.matchTitle].details.isComplete) {
                await completeMatch(new CompleteMatchRequest(ufcEventRes, match.matchTitle));
            }
        }
  }
}
