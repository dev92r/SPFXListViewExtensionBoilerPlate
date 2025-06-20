import { ExtensionContext } from "@microsoft/sp-extension-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

let _sp: SPFI | undefined;

export const getSP = (context?: ExtensionContext): SPFI => {
    if (!_sp && context) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    if (!_sp) {
        throw new Error("SPFI instance is not initialized. Ensure context is provided.");
    }
    return _sp;
};