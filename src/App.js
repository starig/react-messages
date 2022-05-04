import React, {useEffect, useState} from 'react';
import Message from "./components/Message";

function App(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const formData = new FormData();
    let lastMessageId = 0;
    formData.append('actionName', 'MessagesLoad');
    formData.append('messageId', lastMessageId);
    let requestOptions = {
        method: 'POST',
        body: formData,
    }

    function serverRequest() {
        fetch('http://f0665380.xsph.ru/', requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    lastMessageId = result.Messages[result.Messages.length - 1].id;
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        fetch('http://f0665380.xsph.ru/', requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    lastMessageId = result.Messages[result.Messages.length - 1].id;
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );

    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            serverRequest();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);



    if (error) {
        return <div>Error: {error.message} </div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                {/*<div className={'orderToggle'}>
                    <button onClick={toggleMessagesOrder}>Toggle</button>
                </div>*/}
                {items.Messages.map(item => (
                    <Message item={item}/>
                ))}
            </div>
        )
    }
}

export default App;
