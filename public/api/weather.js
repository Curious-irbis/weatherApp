export default async function handler(req, res){
    const city = req.query.city
    const apiKey = process.env.apiKey

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
    )

    const data = await weatherResponse.json()

    return res.status(200).json(data)
}