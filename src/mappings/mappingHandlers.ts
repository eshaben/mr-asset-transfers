import { Transfer } from "../types";
import { SubstrateEvent } from '@subql/types';
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const assetId = event.event.data[0];
    const from = event.event.data[1];
    const to = event.event.data[2];
    const balance = event.event.data[3];

    const transfer = new Transfer(`${event.block.block.header.number.toNumber()}-${event.idx}`);

    transfer.assetId = assetId.toString();
    transfer.from = from.toString();
    transfer.to = to.toString()
    transfer.balance = (balance as Balance).toBigInt();

    await transfer.save();
}
