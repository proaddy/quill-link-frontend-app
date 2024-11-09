import React from 'react'
import { useDashboardContext } from '../components/DashboardContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    
    const {darkmode} = useDashboardContext()

    const timeOfTheDay = () => {
        const now = new Date();
        const hour = now.getHours();
        if(hour > 4 && hour < 12) {
        return 'morning';
        } else if (hour >= 12 && hour < 18) {
        return 'noon';
        } else if (hour >= 18 && hour < 23) {
        return 'evening';
        } else if (hour >= 23 || hour <= 4) {
        return 'night';
        }
    }

    function logout() {
        localStorage.removeItem("userID");
        localStorage.removeItem("username");
        navigate('/login', {state: {action: 'logout'}});
    }

    return (
        <>
        <div id="top" className="flex items-center justify-between p-5">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                Welcome {username}, Good {timeOfTheDay()}
                <img
                    src={`${timeOfTheDay()}${darkmode ? "-white" : ""}.png`}
                    className="h-10"
                />
            </h1>
            <img
                src={`/circle-user${darkmode ? "-white" : ""}.png`}
                alt="Logout"
                className="h-10 cursor-pointer"
                title='Logout'
                onClick={logout}
            />
        </div>
        </>
    )
}
