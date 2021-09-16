import axios from 'axios' // some http client lib

const endpoint = `http://127.0.0.1:8000`;

export default {
    getAttributeGroupsDataBySection() {
        return axios.get(`${endpoint}/userentity/data-type/2e454e63-aa89-4194-a9fb-507e2ff94a42/attributes`).then(response => response.data).catch(err => {
            throw err
        })
    }
}
