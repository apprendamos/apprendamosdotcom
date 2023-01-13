import { XataClient } from "xata/dbs/apprendamos";
import { XataClient as XataClient2 } from "xata/dbs/payments";

export const ApprendamosXataClient = new XataClient();
export const PaymentsXataClient = new XataClient2();