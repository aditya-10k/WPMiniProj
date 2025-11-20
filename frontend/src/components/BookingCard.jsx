const BookingCard = ({ item, onSelect }) => (
  <div className="card">
    {item.imageUrl && <img className="card-image" src={item.imageUrl} alt={item.title} loading="lazy" />}
    <div>
      <p className="muted">{item.location || 'Pickup TBD'}</p>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
    <div className="card-footer">
      <div>
        <strong>₹{item.price}/day </strong>
        <br />
        <small>{item.slotsAvailable} available</small>
      </div>
      <button onClick={() => onSelect(item)}>Select</button>
    </div>
  </div >
);

export default BookingCard;

