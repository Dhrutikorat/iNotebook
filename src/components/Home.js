import React from 'react'
import Notes from './Notes'

function Home() {
    return (
        <>
            <div className="col d-flex mt-4">
                <div className="col grid-margin">
                    <div className="card mb-3" style={{ padding: '30px' }}>
                        <div className="row g-0">
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h4 className="card-title display-3 mb-4">Type note</h4>
                                    <form>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="" placeholder="Title" size="lg" />
                                        </div>
                                        <div className="mb-3">
                                            <textarea type="text" className="form-control" id="" placeholder="Description" rows="8" />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text  bg-gradient-primary text-white" id="basic-addon1">#</span>
                                            <input type="text" className="form-control" id="" placeholder="Tag" />
                                        </div>
                                        <div className="d-flex justify-content-end">

                                            <button className="btn btn-light me-2 ">Cancel</button>
                                            <button type="submit" className="btn-gradient-danger">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <img src={require('../note.gif')} style={{ marginTop: '30px' }} className="img-fluid rounded-start" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notes/>
        </>

    )
}

export default Home
