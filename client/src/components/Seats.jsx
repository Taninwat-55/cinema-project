export const movies = [
  {
    id: 1,
    name: 'The Shawshank Redemption',
    language: 'English',
    salons: [
      {
        id: '1',
        name: 'Salon 1',
        ticketPrices: {
          child: 120,
          adult: 200,
          senior: 150,
        },
        rows: 10,
        cols: 6,
        seats: {
          A: Array(10).fill(0),
          B: Array(10).fill(0),
          // osv
        },
        time: '18:30',
      },
      {
        id: '2',
        name: 'Salon 2',
        ticketPrices: {
          child: 100,
          adult: 180,
          senior: 140,
        },
        rows: 10,
        cols: 5,
        seats: {
          A: Array(10).fill(0),
          B: Array(10).fill(0),
          // osv...
        },
        time: '21:00',
      },
    ],
  },
  // fler filmer
];
