import react from "react";

const tracking =()=>{

    const handleback=()=>{
        window.location.href="/user";
    }

    return (
        <div>
            <button className='btn btn-danger mt-3' onClick={handleback}>Back to dashboard</button>
            <h1 className="text-center">Tracking Page</h1>
        </div>
    )
};

export default tracking;