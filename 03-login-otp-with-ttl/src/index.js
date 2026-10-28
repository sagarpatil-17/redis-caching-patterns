import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json())

const redis = new Redis('redis://localhost:6379')

const otpKey = (phone) => {
    return `otp:${phone}`
}

app.post("/otp", async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(otpKey(phone), otp, 'EX', 30) // otp valid only for 30 sec
    res.json({ message: 'OTP sent successfully!', otp })
})

app.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;
    const savedOtp = await redis.get(otpKey(phone));

    if (!savedOtp) {
        return res.status(400).json({ message: 'OTP expired or not found!' })
    }

    if (savedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP!' })
    }

    await redis.del(otpKey(phone))
    res.json({ message: 'OTP verified successfully!' })
})

app.post('/otp-exists', async (req, res) => {
    const { phone } = req.body;
    const exists = await redis.get(otpKey(phone));
    res.json({ exists: Boolean(exists) })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})