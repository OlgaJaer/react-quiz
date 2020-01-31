import axios from "axios"

export default axios.create({
    baseURL: 'https://react-quiz-665cb.firebaseio.com/'
})