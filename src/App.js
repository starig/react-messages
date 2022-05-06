import React, {useEffect, useState} from 'react';
import Message from "./components/Message";


function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState('default');
    const [ids, setFavorite] = useState( () => {
        const localData = localStorage.getItem('ids');
        return localData ? JSON.parse(localData) : []
    });
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


    function orderStatusSwitch() {
        if (order === 'default') {
            setOrder('reversed');
        } else if (order === 'reversed') {
            setOrder('default');
        }
    }

    useEffect(() => {
        localStorage.setItem('ids', JSON.stringify(ids))
    }, [ids]);
    useEffect(handleFavorite, []);
    function handleFavorite(currentId) {
        if (!ids.includes(currentId)) {
            const temp = [...ids];
            temp.push(currentId);
            setFavorite(temp);
        } else if (ids.includes(currentId)){
            const temp = [...ids];
            const removingId = temp.indexOf(currentId);
            temp.splice(removingId, 1);
            setFavorite(temp);
        }
    }




    if (error) {
        return <div>Error: {error.message} </div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else if (order === 'default') {
        console.log(ids)
        return (
            <div>
                <div className={'orderToggle'}>
                    <button onClick={orderStatusSwitch}>Toggle</button>
                </div>
                {items.Messages.map((item, idx) => (
                    <Message key={idx} item={item} favoriteList={ids} handleFavoriteFunction={handleFavorite}/>
                ))}
            </div>
        )
    } else if (order === 'reversed') {
        console.log(ids)
        return (
            <div>
                <div className={'orderToggle'}>
                    <button onClick={orderStatusSwitch}>Toggle</button>
                </div>
                {[...items.Messages].reverse().map((item, idx) => (
                    <Message key={idx} item={item} favoriteList={ids} handleFavoriteFunction={handleFavorite}/>
                ))}
            </div>
        )
    }
}

export default App;
