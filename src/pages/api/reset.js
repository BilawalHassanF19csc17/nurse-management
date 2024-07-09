import { getTimers, removeTimers } from '../../../lib/timers';

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const timers =  await getTimers();
        const { bed, room, } = req.body;

        const id = `${bed}-${room}`;

        let newTimers = timers.filter((item) => item.id === id)

        const response = removeTimers(newTimers); {
            if(response){
                res.status(200).json({ message: 'Timer Stopped ' });
            } else {
                res.status(400).json({ message: 'Could not Stop the Timer' });
            }
        }
    }
}
