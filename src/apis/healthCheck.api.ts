import { logError } from "@utils/log";
import { databaseHealth } from "./backendApi";
import { ufcApiHealth } from "./ufcApi";

export async function healthCheck() {
    const databaseResponse = await databaseHealth();
    const ufcApiResponse = await ufcApiHealth();
    
    if (databaseResponse && ufcApiResponse) {
        return true;
    }
    else if (!databaseResponse) {
        logError('Database is unreachable');
    }
    else if (!ufcApiResponse) {
        logError('UFC API is unreachable');
    }
}