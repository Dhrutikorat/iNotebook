import React from 'react'
import Notes from './Notes'

function Home(props) {
    return (
        <>
            <Notes showAleart={props.showAleart}/>
        </>

    )
}

export default Home
