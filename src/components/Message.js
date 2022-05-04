import React from 'react';
import './Message.css';
import avatarImg from './img/avatar.png';
import favoriteOff from './img/favoriteOff.png'
import favoriteOn from './img/favoriteOn.png'
import hideMessageImg from './img/hideMessage.png'
import noImage from './img/noImage.jpg'
import sendMessageImg from './img/sendMessage.png'
import settingsImg from './img/settings.png'




function Message(props) {
    let attachmentContent = <img width={'259'} controls height={'146'} src={noImage} />;
    if (props.item.attachments.length !== 0) {
        let attachmentType = props.item.attachments[0].type;
        let attachmentUrl = props.item.attachments[0].url;
        switch (attachmentType) {
            case 'image':
                attachmentContent = <img width={'259'} controls height={'146'} src={attachmentUrl} />
                break;
            case 'video':
                attachmentContent = <video width={'259'} controls height={'146'} src={attachmentUrl}></video>
        }
    }

    return (
        <div className="message">
            <div className="messageHeader">
                <div className="messageAuthor">
                    <img src={avatarImg} alt="" className="avatar"/>
                    <div className="authorName">{props.item.author}
                        <div className="authorChannel">{props.item.channel}</div>
                    </div>
                </div>
                <div className="sideButtons">
                    <div className="sideButton">Левый</div>
                    <div className="sideButton">Центр</div>
                    <div className="sideButton">Правый</div>
                </div>
                <div className="icons">
                    <div className="icon">
                        <img src={sendMessageImg} alt="" className="iconImg"/>
                    </div>
                    <div className="icon">
                        <img src={hideMessageImg} alt="" className="iconImg"/>
                    </div>
                    <div className="icon">
                        <img src={settingsImg} alt="" className="iconImg"/>
                    </div>
                    <div className="icon">
                        <img src={favoriteOff} alt="" className="iconImg"/>
                    </div>
                </div>
            </div>
            <div className="messageBody">
                <div className="messageDate">{props.item.date.slice(11, 16)}</div>
                <div className="messageContent">
                    {props.item.content}
                    <div className="nextButton">Далее</div>
                    <div className="messageImage">
                        {attachmentContent}
                    </div>
                </div>

            </div>
            <div className="messageHashtags">
                <div className="messageHashtag">#Новое</div>
                <div className="messageHashtag">#Эксперт</div>
            </div>
        </div>
    );
}


export default Message;
