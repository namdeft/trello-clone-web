import logo from 'assets/img/dieuling.jpeg'

export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'First Column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card-1',
                            cover: logo
                        },
                        {
                            id: 'card-2',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card-2',
                            cover: null
                        },
                        {
                            id: 'card-3',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card-3',
                            cover: null
                        },
                        {
                            id: 'card-4',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card-4',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Second Column',
                    cardOrder: ['card-5', 'card-6', 'card-7', 'card-8'],
                    cards: [
                        {
                            id: 'card-5',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card-5',
                            cover: logo
                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card-6',
                            cover: null
                        },
                        {
                            id: 'card-7',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card-7',
                            cover: null
                        },
                        {
                            id: 'card-8',
                            boardId: 'board-2',
                            columnId: 'column-1',
                            title: 'Title of card-8',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Third Column',
                    cardOrder: ['card-9', 'card-10', 'card-11', 'card-12'],
                    cards: [
                        {
                            id: 'card-9',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card-9',
                            cover: logo
                        },
                        {
                            id: 'card-10',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card-10',
                            cover: null
                        },
                        {
                            id: 'card-11',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card-11',
                            cover: null
                        },
                        {
                            id: 'card-12',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card-12',
                            cover: null
                        }
                    ]
                }
            ]
        }
    ]
}
