import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/BookingPage.css';
import MovieInfo from '../components/BookingPage/MovieInfo';
import TicketSelector from '../components/BookingPage/TicketSelector';
import SeatSelector from '../components/BookingPage/SeatSelector';

function BookingPage() {
  const { showing_id } = useParams();
  const navigate = useNavigate();
  const [showing, setShowing] = useState(null);
  const [movie, setMovie] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({
    adult: 0,
    child: 0,
    senior: 0,
  });

  // Hämta visnings- och filminformation
  useEffect(() => {
    document.body.style.backgroundColor = '#222831';

    fetch(`/api/showings/${showing_id}`)
      .then((res) => {
        if (!res.ok) {
          console.error('Status:', res.status);
          return res.text().then((text) => {
            console.error('Error response:', text);
            throw new Error('Kunde inte hämta visning');
          });
        }
        return res.json();
      })
      .then((data) => {
        setShowing(data);
        return fetch(`/api/movies/${data.movie_id}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error('Fel vid hämtning av data:', error);
      });
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [showing_id]);

  // Hämta tillgängliga platser
  useEffect(() => {
    if (!showing || !showing.theater_id) return;

    fetch(`/api/seats/${showing.theater_id}/available`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableSeats(data);
      })
      .catch((err) => {
        console.error('Fel vid hämtning av platser:', err);
      });
  }, [showing]);

  // Funktion för att hantera val av platser
  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      return;
    }

    if (selectedSeats.length >= totalTickets) {
      alert(`Du kan max välja ${totalTickets} platser`);
      return;
    }

    setSelectedSeats([...selectedSeats, seatId]);
  };

  // Funktion för att slutföra bokningen
  const handleCompleteBooking = () => {
    if (selectedSeats.length !== totalTickets) {
      alert(`Du måste välja exakt ${totalTickets} platser`);
      return;
    }

    const bookingData = {
      showing_id: parseInt(showing_id),
      tickets: ticketCounts,
      seats: selectedSeats,
      total_price: totalPrice,
    };

    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Kunde inte spara bokning');
        return res.json();
      })
      .then((data) => {
        alert(
          `Bokning slutförd! Ditt bokningsnummer är: ${data.booking_number}`
        );
        navigate('/');
      })
      .catch((err) => {
        console.error('Fel vid bokning:', err);
        alert('Något gick fel vid bokningen. Försök igen.');
      });
  };

  const handleTicketChange = (type, value) => {
    // Säkerställ att värdet inte blir negativt
    const newValue = Math.max(0, value);
    setTicketCounts({
      ...ticketCounts,
      [type]: newValue,
    });
  };

  const totalTickets =
    ticketCounts.adult + ticketCounts.child + ticketCounts.senior;

  const totalPrice = showing
    ? ticketCounts.adult * showing.price_adult +
      ticketCounts.child * showing.price_child +
      ticketCounts.senior * showing.price_senior
    : 0;

  const moveToSeatSelection = () => {
    if (totalTickets > 0) {
      setCurrentStep(2);
    } else {
      alert('Du måste välja minst en biljett');
    }
  };

  if (!showing || !movie) return <p>Laddar visning...</p>;

  const showingDate = new Date(showing.showing_time);
  const formattedDate = new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(showingDate);

  return (
    <div className="booking-page">
      <h1>Boka biljetter</h1>

      <div className="movie-info">
        {movie.poster_url && (
          <img
            src={movie.poster_url}
            alt={`Poster för ${movie.title}`}
            className="booking-page-poster"
          />
        )}
        <div>
          <h2 className="theater-name">{showing.theater_name}</h2>
          <h2>{movie.title}</h2>
          <p>
            <strong>Tid:</strong> {formattedDate}
          </p>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="ticket-selection">
          <h2>Välj antal biljetter</h2>

          <div className="ticket-type">
            <div className="ticket-info">
              <span>Vuxna ({showing.price_adult} kr)</span>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() =>
                  handleTicketChange('adult', ticketCounts.adult - 1)
                }
                disabled={ticketCounts.adult === 0}
              >
                -
              </button>
              <span>{ticketCounts.adult}</span>
              <button
                onClick={() =>
                  handleTicketChange('adult', ticketCounts.adult + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="ticket-type">
            <div className="ticket-info">
              <span>Barn ({showing.price_child} kr)</span>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() =>
                  handleTicketChange('child', ticketCounts.child - 1)
                }
                disabled={ticketCounts.child === 0}
              >
                -
              </button>
              <span>{ticketCounts.child}</span>
              <button
                onClick={() =>
                  handleTicketChange('child', ticketCounts.child + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="ticket-type">
            <div className="ticket-info">
              <span>Pensionärer ({showing.price_senior} kr)</span>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() =>
                  handleTicketChange('senior', ticketCounts.senior - 1)
                }
                disabled={ticketCounts.senior === 0}
              >
                -
              </button>
              <span>{ticketCounts.senior}</span>
              <button
                onClick={() =>
                  handleTicketChange('senior', ticketCounts.senior + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="booking-summary">
            <h3>Totalpris: {totalPrice} kr</h3>
            <button
              className="next-button"
              onClick={moveToSeatSelection}
              disabled={totalTickets === 0}
            >
              Gå vidare till platsval
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="seat-selection">
          <h3>Välj platser</h3>
          <p>Välj {totalTickets} platser</p>

          <div className="seat-grid">
            {availableSeats.length === 0 ? (
              <p>⏳ Laddar platser eller inga platser tillgängliga.</p>
            ) : (
              availableSeats.map((seat) => (
                <button
                  key={seat.seat_id}
                  className={`seat ${
                    selectedSeats.includes(seat.seat_id) ? 'selected' : ''
                  }`}
                  onClick={() => handleSeatSelection(seat.seat_id)}
                  disabled={!seat.is_available}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-armchair-icon lucide-armchair"
                  >
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                    <path d="M5 18v2" />
                    <path d="M19 18v2" />
                  </svg>
                </button>
              ))
            )}
          </div>

          <div className="booking-actions">
            <button onClick={() => setCurrentStep(1)}>Tillbaka</button>
            <button
              className="complete-btn"
              onClick={handleCompleteBooking}
              disabled={selectedSeats.length !== totalTickets}
            >
              Slutför bokning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
