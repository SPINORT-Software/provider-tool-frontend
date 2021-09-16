import axios from 'axios' // some http client lib

const endpoint = `http://127.0.0.1:8000`;

export default {
    getAttributeGroupsDataBySection(sectionUuid) {
        try {
            return axios.get(`${endpoint}/userentity/data-type/${sectionUuid}/attributes`)
        } catch (err) {
            return err
        }
    },
    getSectionsAndAttributeGroupsDataByRole(roleId) {
        /**
         * Fetch All sections and their attribute groups by Role Identifier
         * @param roleId
         * @returns {*|Promise<AxiosResponse<any>>}
         */
        try {
            return axios.get(`${endpoint}/accounts/roles/${roleId}/entity-data-types/attributes`)
        } catch (err) {
            return err
        }
    }
}
