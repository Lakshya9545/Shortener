import prisma from '../prisma/export.mjs';
import { nanoid } from 'nanoid';

const posturlShortener = async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ message: 'Invalid URL' });
    }
    const urlCode = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
    try {
        const newUrl = await prisma.url.create({
            data: {
                originalUrl,
                urlCode,
                shortUrl,
            },
        });
        res.status(200).json({ message: 'New URL created', shortUrl });
    } catch (error) {
        console.error('Error in database connection', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const geturlShortener = async (req, res) => {
    const { shortId } = req.params;
    console.log(`Received shortId: ${shortId}`); 
    try {
        const url = await prisma.url.findUnique({
            where: { urlCode: shortId },
        });
        if (!url) {
            console.log(`URL not found for shortId: ${shortId}`);
            return res.status(404).json({ message: 'URL not found' });
        }
        console.log(`Redirecting to: ${url.originalUrl}`); 
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error in database connection', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { posturlShortener, geturlShortener };
