use hotel_bookings
db.dropDatabase();

db.bookings.insertMany([
    {
        name: "Douglas",
        email: "douglas@gmail.com",
        checked_in : false
    },
    {
        name: "Graeme",
        email: "graeme@gmail.com",
        checked_in: false
    }
])