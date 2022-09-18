export const applyDrag = (arr, dragResult) => {
    const { addedIndex, payload, removedIndex } = dragResult

    if (addedIndex === null && removedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}

