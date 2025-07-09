import { BaseClient } from "./BaseClient";
import { getConfig } from "../util/Config";
import {ProductService} from "./ProductService";
import {AuthClient} from "./AuthClient";
import {UserService} from "./UserService";

export class MetergramClient{

    private client: BaseClient;
    productService: ProductService;
    authClient: AuthClient;
    userService: UserService;

    /**
     * Creates an instance of the MetergramClient.
     * Initializes headers and base URL for API requests.
     */
     constructor() {
        const config = getConfig();
        this.client = new BaseClient();
        this.productService = new ProductService(this.client);
        this.authClient = new AuthClient(this.client);
        this.userService = new UserService(this.client);
    }

}
