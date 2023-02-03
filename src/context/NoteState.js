import NoteContext from './noteContext'
import {useState} from 'react'

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "63dbaf96af0b28fe15425606",
            "user": "63db7d29299a54dc044aa72d",
            "title": "Read a book !!!",
            "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, sit voluptatem accusantium doloremque sit voluptatem accusantium doloremque ",
            "tag": "personal",
            "date": "2023-02-02T12:41:58.576Z",
            "__v": 0
        },
        {
            "_id": "63dd0ada25e80c42c2c990e0",
            "user": "63db7d29299a54dc044aa72d",
            "title": "do charanvidhi",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
            "tag": "personal",
            "date": "2023-02-03T13:23:38.617Z",
            "__v": 0
        },{
            "_id": "63dbaf96af0b28fe15425606",
            "user": "63db7d29299a54dc044aa72d",
            "title": "Read a book !!!",
            "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ",
            "tag": "personal",
            "date": "2023-02-02T12:41:58.576Z",
            "__v": 0
        },
        {
            "_id": "63dd0ada25e80c42c2c990e0",
            "user": "63db7d29299a54dc044aa72d",
            "title": "do charanvidhi",
            "description": "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ",
            "tag": "personal",
            "date": "2023-02-03T13:23:38.617Z",
            "__v": 0
        },{
            "_id": "63dbaf96af0b28fe15425606",
            "user": "63db7d29299a54dc044aa72d",
            "title": "Read a book !!!",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "tag": "personal",
            "date": "2023-02-02T12:41:58.576Z",
            "__v": 0    
        },
        {
            "_id": "63dd0ada25e80c42c2c990e0",
            "user": "63db7d29299a54dc044aa72d",
            "title": "do charanvidhi",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
            "tag": "personal",
            "date": "2023-02-03T13:23:38.617Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;