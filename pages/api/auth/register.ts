import type { NextApiRequest, NextApiResponse } from "next";
import { AppXataClient, AuthenticationXataClient } from "xata/clients";
import { getSession } from "next-auth/react";
import { AuthUserType } from "types";

type Data = {
    id?: string;
    error?: string;
};

type RegisterBody = {
    username: string;
    name: string;
    bio?: string;
    birthdate?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "POST":
            const session = await getSession({ req });
            console.log("session", session);
            if (!session || !session.user) {
                return res.status(401).json({ error: "Not authenticated." });
            }

            const user = session.user as AuthUserType;

            if (user.profile) {
                return res.status(401).json({ error: "Already registered." });
            }

            const { name, username, bio, birthdate } = req.body as RegisterBody;

            const created = await AppXataClient.db.Profile.create({
                name,
                username,
                bio: bio || undefined,
                birthdate: birthdate ? new Date(birthdate) : undefined,
            });

            await AuthenticationXataClient.db.User.update(user.id, {
                profile: created.id,
            });

            res.status(200).json({ id: created.id });

            break;
        default:
            res.status(404).end();
    }
}
