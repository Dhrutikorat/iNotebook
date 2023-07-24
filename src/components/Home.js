import React from 'react'
import Notes from './Notes'

function Home(props) {
    props.setBodyColor("#f2edf3");
    return (
        <>
            <Notes showAleart={props.showAleart} colorNames={props.colorNames}/>
        </>

    )
}

export default Home
