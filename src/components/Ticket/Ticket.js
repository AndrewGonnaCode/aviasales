import './Ticket.css';


const renderPrice = (price, value) => {
    let arr = [];
    price = price.toString().split('').reverse();
    price.forEach((_, index, array) => index % value === 0 ? arr.push(array.slice(index, index + value)): null);
    arr.reverse().forEach(item => item.reverse());
    const p = arr.map(item => item.join('')).join(' ');
    return p;
};

const mapMinutesToHours = (minutes) => {
    return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
};

const formateStops = (value) => {
    if (value === 1) return 'пересадка';
    if([2,3,4].includes(value)) {
        return 'пересадки'
    }
    return 'пересадок';
};

const formateRouteTime = (date, duration) => {
    let arrivalDate =  Date.parse(date) + duration * 60 * 1000;
    return `${
        new Date(date).toLocaleString().split(', ')[1].split(':').slice(0,2).join(':')} 
        - 
        ${new Date(arrivalDate).toLocaleString().split(', ')[1].split(':').slice(0,2).join(':')}`
};

const Ticket = props => {
    return (
        <div className="tickets__ticket ticket">

            <div className="ticket__header">
                <div className="ticket__price">
                    {
                        renderPrice(props.ticket.price, 3)
                    } Р
                </div>
                <div className="ticket__carrier">
                    <img src={`http://pics.avs.io/99/36/${props.ticket.carrier}.png`} alt="S7" />
                </div>
            </div>

            <div className="ticket__body">
                {
                    props.ticket.segments.map((segment, index) => (
                        <div className="ticket__segment segment" key={index}>
                            <div className="segment__route route">
                                <div className="route__points">{segment.origin} – {segment.destination}</div>
                                <div className="route__time">{formateRouteTime(segment.date, segment.duration)}</div>
                            </div>
                            <div className="segment__length length">
                                <div className="length__title">В пути</div>
                                <div className="length__time">{mapMinutesToHours(segment.duration)}</div>
                            </div>
                            <div className="segment__stops stop">
                                <div className="stop__title">{segment.stops.length} {formateStops(segment.stops.length)}</div>
                                <div className="stop__points">{segment.stops.join(', ')}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Ticket;