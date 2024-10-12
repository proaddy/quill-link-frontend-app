import React from 'react'
import { useDashboardContext } from '../components/DashboardContext'

export default function Header() {

    
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
    console.log(timeOfTheDay());
    return (
        <>
        <div id="top" className="flex items-center justify-between p-5">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                Welcome User, Good {timeOfTheDay()}
                <img
                    src={`${timeOfTheDay()}${darkmode ? "-white" : ""}.png`}
                    className="h-10"
                />
            </h1>
            <img
                src={`/circle-user${darkmode ? "-white" : ""}.png`}
                alt="user"
                className="h-10"
            />
        </div>
        </>
    )
}
