import axios from 'axios'

import { API_ROOT } from '../../utilities/constants'

export const fetchBoards = async (boardId) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

    return request.data
}

export const updateBoard = async (boardId, data) => {
    const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, data)

    return request.data
}

export const createNewColumn = async (data) => {
    const result = await axios.post(`${API_ROOT}/v1/columns/`, data)

    return result.data
}

export const updateColumn = async (id, data) => {
    const result = await axios.put(`${API_ROOT}/v1/columns/${id}`, data)

    return result.data
}

export const createNewCard = async (data) => {
    const result = await axios.post(`${API_ROOT}/v1/cards/`, data)

    return result.data
}

export const updateCard = async (id, data) => {
    const result = await axios.put(`${API_ROOT}/v1/cards/${id}`, data)

    return result
}
