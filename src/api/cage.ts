import { Nick } from '../types/Nick'

export class CageApi {
    // hardcoded configuration here -- should be loaded per env as necessary
    apiUrl = "https://cagingnick-default-rtdb.firebaseio.com/cage/peggy.json";

    async getAll(): Promise<Nick[]>  {
        const res = await fetch(this.apiUrl);
        const data = await res.json();
        return data;
    }

    async update(nicks: Nick[]) {
        if (!nicks || nicks.length === 0) {
            throw new Error("cannot update an empty data set");
        }
        await fetch(this.apiUrl, {
            method: 'PUT',
            body: JSON.stringify(nicks),
        });
    }
}