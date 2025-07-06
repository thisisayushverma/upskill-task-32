import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Upload() {

    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const parsed = JSON.parse(jsonInput); // validate JSON
            setError('');

            const res = await fetch(`${backendUrl}/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('auth-key')
                },
                body: JSON.stringify({data:parsed}),
            });

            const data = await res.json();
            if(data.success === false){
                setError(data.message);
                navigate('/login')
            } 
            setResponse(data);
        } catch (err) {
            setError('Invalid JSON');
            setResponse(null);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
            <h2 className="text-2xl font-semibold mb-4">JSON Input Form</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-48 p-3 border rounded-lg text-sm font-mono resize-none"
                    placeholder='Enter JSON here...'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                ></textarea>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>

            {response && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Response:</h3>
                    <pre className="text-sm text-gray-800">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default Upload
