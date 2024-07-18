// db.js
import pg, {Client, ClientConfig} from "pg"

/**
 * Синглтон клиента постгреса
 */
export class PostgresDB {
    private static client: Client

    static async createClient(config: ClientConfig): Promise<Client> {
        const client = new Client(config);
        await client.connect();
        this.client = client;
        return client;
    }
    static getClient(): Client {
        return this.client;
    }
}


