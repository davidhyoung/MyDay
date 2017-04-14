import React from 'react';

const Clock = (props) => {
    const { currentTime } = props;
    const hours = currentTime.format('H');
    const hoursRotation = hours / 12 * 360;
    const minutes = currentTime.format('m');
    const minutesRotation = minutes / 60 * 360;    

    const face = {
        position: 'relative',
        background: '#f8f6e3',
        border: '3px solid black',
        borderRadius: '100%',
        width: '120px',
        height: '120px',
    }

    const centerDot = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '10px',
        height: '10px',
        borderRadius: '100%',
        background: 'black',
        transform: 'translate(-50%, -50%)',
    }

    const minuteHand = {
        position: 'absolute',
        width: '2px',
        height: '45%',
        top: '5%',
        left: 'calc(50% - 1px)',
        background: 'black',
        transformOrigin: '50% 100%',
        transform: `rotate(${minutesRotation}deg)`,
    }

    const hourHand = {
        position: 'absolute',
        width: '2px',
        height: '25%',
        top: '25%',
        left: 'calc(50% - 1px)',
        background: 'black',
        transformOrigin: '50% 100%',
        transform: `rotate(${hoursRotation}deg)`,
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{ 
                marginRight: '1em', 
                fontWeight: 'bold',
            }}>
                {currentTime.format('h:mma')}
            </div>
            <div style={face}>
                <div style={minuteHand} />
                <div style={hourHand} />
                <div style={centerDot} />
            </div>
        </div>
    )
}

export default Clock;