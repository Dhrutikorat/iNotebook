import React, { useContext,useEffect } from 'react'
import noteContext from '../context/noteContext'


function About() {
    const a = useContext(noteContext);
    useEffect(() => {
        return () => {
            a.update();
        };
    });
    return (
        <div>
            This is About {a.state.name}
        </div>
    )
}

export default About
