import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Read() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [readData, setReadData] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const fetchForRead = async () => {
        const token = localStorage.getItem("auth-key");
        if (!token) {
            navigate('/login')
            return;
        }

        await fetch(`${backendUrl}/read`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success === false) {
                    navigate('/login')
                    return
                }
                console.log(data.data);
                setReadData(data.data);
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg(err.message)
            })
    }

    useEffect(() => {
        fetchForRead();
    }, [])
    return (
        <div className='w-full h-full flex items-center justify-center flex-col'>
            {
                readData && (
                    <h1>
                        {

                            <div className="w-full max-w-3xl mt-6 bg-white border rounded-lg p-4 shadow">
                                <h2 className="text-xl font-semibold mb-2">Parsed Output:</h2>
                                <pre className="text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
                                    {JSON.stringify(readData, null, 2)}
                                </pre>
                            </div>
                        }
                    </h1>
                )
            }
            {
                errorMsg && (
                    <p>{errorMsg}</p>
                )
            }
        </div>
    )
}

export default Read
