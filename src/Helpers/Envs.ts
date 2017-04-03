export class Envs {

    /**
     * Returns the from email address used for the system
     *
     * @return {string}
     */
    static from() {
        return process.env.FROM;
    }

    /**
     * Returns Auth0Secret
     *
     * @returns {string}
     */
    static auth0Secret():string {
        return process.env.AUTH0_SECRET;
    }

    /**
     * Returns HarvestSecret
     *
     * @returns {string}
     */
    static harvestSecret():string {
        return process.env.HARVEST_SECRET;
    }

    /**
     * The env
     *
     * @returns {string}
     */
    static env():string {
        return process.env.ENV;
    }

    /**
     * Returns the to email address used for the system
     *
     * @return {string}
     */
    static to():string {
        return process.env.TO;
    }

    /**
     * Returns an array of to email addresses
     *
     * @return {string[]}
     */
    static toAddressesArray():Array<string> {
        return Envs.to().split('|');
    }
}
