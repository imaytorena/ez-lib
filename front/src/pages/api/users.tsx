import axios from "axios"

export default async function handler(req, res) {
    try {
        let headers = {}
        const data = await axios.post('http://localhost:8000/api/users', { param: req.body.param }, headers)
        res.status(200).json(data)
    } catch (error) {
        // console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}