import  { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/user';

export const isOwner = async (req: any, res: any, next: any) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) return res.sendStatus(403);

        if (currentUserId.toString() !== id) return res.sendStatus(403);

        return next(); 
              
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const isAuthenticated = async (req: any, res: any, next: any) => {
    try {
        const sessionToken = req.cookies['USER-API'];
        if (!sessionToken) return res.sendStatus(403);

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) return res.sendStatus(403);

        merge(req, { identity: existingUser });

        return next(); 
              
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}