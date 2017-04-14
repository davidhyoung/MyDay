import React from 'react';
import ReactMarkdown from 'react-markdown';

const Welcome = (props) => {
    const { media, message } = props;
    const container = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: '0 0.5em',
    }
    const image = {
        position: 'relative',
        flexShrink: 1,
        flexGrow: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 0.5em',
        paddingBottom: message && '0.5em',
        backgroundImage: media && `url(${media.fields.file.url})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
    }
    const messageContainer = {
        padding: '0.5em',
        flexShrink: 0,
    }
    return (
        <div style={container}>
            {message && 
                <div style={messageContainer}>
                    <ReactMarkdown source={message} />
                </div>
            }
            {media && 
                <div style={image} />
            }
        </div>
    )
}

export default Welcome;