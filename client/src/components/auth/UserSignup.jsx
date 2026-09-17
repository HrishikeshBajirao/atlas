import { useState } from 'react'

export function UserSignup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const handleFormSubmit =async (e) => {
        e.preventDefault();
        setMessage("")
        try{
            const url = new URL(`${import.meta.env.VITE_API_URL}/auth/signup`)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.error?.message || "Signup failed");
                return;
            }

            console.log(data)//
            setPassword("")
        } catch(err){
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleFormSubmit}
        className="text-white">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="border border-white m-5"
            required />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="border border-white m-5"    
            required />
            <button type="submit" className="bg-white p-2 rounded-md text-black block">submit</button>
            <p className="text-red-600">{message}</p>
            <a href="">go to login</a>
        </form>
    )
}