import React from 'react'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Message() {
    const [messages, setMessages] = useState([]);

    async function fetchMessages() {

        const response = await axios.get(
            "https://zunis-node-js.vercel.app/message/messageAdmin",
        );
        setMessages(response.data.messages);

    };
    useEffect(() => {

        fetchMessages();
    }, []);

    return <>
        <section className="page messages">
            <h1>MESSAGE</h1>
            <div className="banner">
                {messages && messages.length > 0 ? (
                    messages.map((element) => {
                        return (
                            <div className="card" key={element._id}>
                                <div className="details">
                                    <p>
                                        Full Name: <span>{element.fullName}</span>
                                    </p>

                                    <p>
                                        Email: <span>{element.email}</span>
                                    </p>
                                    <p>
                                        From userId: <span>{element.from}</span>
                                    </p>
                                    <p>
                                        Message: <span>{element.message}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1>No Messages!</h1>
                )}
            </div>
        </section>
    </>
}
