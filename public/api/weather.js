export default async function handler(req, res){
    const city = req.query.city
    const apiKey = process.env.apiKey

    if(!apiKey){
        return res.status(500).json({error: 'API key is not configured'})
    }

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
    )

    const data = await weatherResponse.json()

    return res.status(200).json(data)
}