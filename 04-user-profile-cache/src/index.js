import express, { json } from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis('redis://localhost:6379');

// endpoint json
app.post('/user/:id/json', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    await redis.set(`user:${userId}:json`, JSON.stringify(userData), 'EX', 30);
    res.json({ message: 'profile added successfully!' })
})

app.get('/user/:id/json', async (req, res) => {
    const userId = req.params.id;
    const userData = await redis.get(`user:${userId}:json`);
    res.json({ user: userData ? JSON.parse(userData) : null });
})

// endpoint - hash
app.post('/user/:id/hash', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    await redis.hset(`user:${userId}:hash`, userData);
    res.json({ message: 'profile added successfully!' })
})

app.get('/user/:id/hash', async (req, res) => {
    const userId = req.params.id;
    const userData = await redis.hgetall(`user:${userId}:hash`);

    res.json({ userData });
})

// endpoint array  
app.post('/user/:id/array', async (req, res) => {
    const userId = req.params.id;
    const arrayData = req.body;

    await redis.set(`user:${userId}:list`, JSON.stringify(arrayData), 'EX', 3600);
    res.json({ message: 'Array cached successfully!' });
});

app.get('/user/:id/array', async (req, res) => {
    const userId = req.params.id;
    const rawData = await redis.get(`user:${userId}:list`);

    if (!rawData) {
        return res.json([]);
    }

    const array = JSON.parse(rawData);
    res.json(array);
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
})