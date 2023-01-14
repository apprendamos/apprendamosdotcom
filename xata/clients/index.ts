import { XataClient as AppClient } from "xata/dbs/app";
import { XataClient as PaymentsClient } from "xata/dbs/payments";
import { XataClient as AuthenticationClient } from "xata/dbs/authentication";

export const AppXataClient = new AppClient();
export const PaymentsXataClient = new PaymentsClient();
export const AuthenticationXataClient = new AuthenticationClient();
