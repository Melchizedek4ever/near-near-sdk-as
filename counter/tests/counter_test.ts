
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.3.1/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "get-count returns u0 for principals that never called count-up before",
    async fn(chain: Chain, accounts: Map<string,Account>) {
        //get deployer account.
        let deployer = accounts.get("deployer")!;

        //Call the get-count read-only function.
        //The first parameter is the contract name, the second the function name and the third the 
        //functions arguments as an array. The final parameter is the tx-sender.
        let count = chain.callReadOnlyFn("counter","get-count",[
            types.principal(deployer.address),
        ],deployer.address);

        //Assert that the returned result is a uint with a value of 0 (u0).
        count.result.expectUint(0)
    }
});