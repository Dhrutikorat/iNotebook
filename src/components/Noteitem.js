import React from 'react'

function Noteitem(props) {
    const { note } = props;
    return (
        <>
            <div className="card bg-gradient-danger card-img-holder text-white">
                <div className="card-body">
                    <img src={require("../circle.png")} className="card-img-absolute" alt="circle" />
                    <h2 className="font-weight-normal mb-3">{note.title}</h2>
                    {/* <i className="mdi mdi-chart-line mdi-24px float-right"></i> */}
                    <p>{note.description}</p>
                </div>
            </div>
        </>
    )
}

export default Noteitem
