function SeatSelector({ 
    availableSeats, 
    selectedSeats, 
    handleSeatSelection, 
    totalTickets,
    onGoBack,
    onComplete
  }) {
    return (
      <div className="seat-selection">
        <h3>Välj platser</h3>
        <p>Välj {totalTickets} platser</p>
  
        <div className="seat-grid">
          {availableSeats.map((seat) => (
            <button
              key={seat.seat_id}
              className={`seat ${
                selectedSeats.includes(seat.seat_id) ? 'selected' : ''
              }`}
              onClick={() => handleSeatSelection(seat.seat_id)}
              disabled={!seat.is_available}
            >
              Rad {seat.row_number}, Plats {seat.seat_number}
            </button>
          ))}
        </div>
  
        <div className="booking-actions">
          <button onClick={onGoBack}>Tillbaka</button>
          <button
            className="complete-btn"
            onClick={onComplete}
            disabled={selectedSeats.length !== totalTickets}
          >
            Slutför bokning
          </button>
        </div>
      </div>
    );
  }
  
  export default SeatSelector;