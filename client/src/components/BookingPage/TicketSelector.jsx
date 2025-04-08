function TicketSelector({ 
    screening, 
    ticketCounts, 
    handleTicketChange,
    totalTickets,
    totalPrice,
    onContinue
  }) {
    return (
      <div className="ticket-selection">
        <h2>Välj antal biljetter</h2>
  
        <div className="ticket-type">
          <div className="ticket-info">
            <span>👨‍🦱 Vuxna ({screening.price_adult} kr)</span>
          </div>
          <div className="ticket-controls">
            <button
              onClick={() => handleTicketChange('adult', ticketCounts.adult - 1)}
              disabled={ticketCounts.adult === 0}
            >
              -
            </button>
            <span>{ticketCounts.adult}</span>
            <button
              onClick={() => handleTicketChange('adult', ticketCounts.adult + 1)}
            >
              +
            </button>
          </div>
        </div>
  
        <div className="ticket-type">
          <div className="ticket-info">
            <span>👧 Barn ({screening.price_child} kr)</span>
          </div>
          <div className="ticket-controls">
            <button
              onClick={() => handleTicketChange('child', ticketCounts.child - 1)}
              disabled={ticketCounts.child === 0}
            >
              -
            </button>
            <span>{ticketCounts.child}</span>
            <button
              onClick={() => handleTicketChange('child', ticketCounts.child + 1)}
            >
              +
            </button>
          </div>
        </div>
  
        <div className="ticket-type">
          <div className="ticket-info">
            <span>👴 Pensionärer ({screening.price_senior} kr)</span>
          </div>
          <div className="ticket-controls">
            <button
              onClick={() => handleTicketChange('senior', ticketCounts.senior - 1)}
              disabled={ticketCounts.senior === 0}
            >
              -
            </button>
            <span>{ticketCounts.senior}</span>
            <button
              onClick={() => handleTicketChange('senior', ticketCounts.senior + 1)}
            >
              +
            </button>
          </div>
        </div>
  
        <div className="booking-summary">
          <h3>💰 Totalpris: {totalPrice} kr</h3>
          <button
            className="next-button"
            onClick={onContinue}
            disabled={totalTickets === 0}
          >
            Gå vidare till platsval
          </button>
        </div>
      </div>
    );
  }
  
  export default TicketSelector;