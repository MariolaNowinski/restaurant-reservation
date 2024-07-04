import rls from "readline-sync";

// Öffnungszeiten definieren

const openingHours = {
    "Montag": {open: null, close: null},                   
    "Dienstag": {open: "16:00", close: "22.00"},
    "Mittwoch": {open: "16:00", close: "22.00"},
    "Donnerstag": {open: "16:00",close: "22:00"},
    "Freitag": {open: "16:00", close: "22:00"},
    "Samstag": {open: "16:00", close: "22:00"},
    "Sonntag": {open: "12:00", close: "22:00"}
};

const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

// Initialisierung

const tables = [];                                           
for (let i = 1; i <= 20; i++) {
    tables.push({tableId: i, seats: 4});                     
}
const reservations = [];



//console.log(tables);


// Reservierung hinzufügen



function addReservation(name, date, time, numberOfPeople) {

    

    if (isInPast(date, time)) {
        console.log(`Datum oder Uhrzeit liegt in der Vergangenheit.`);
        return;
    }

    if (!isWithinOpeningHours(date, time)) {
        console.log(`Die Reservierung liegt außerhalb der Öffnungszeiten.`);
        return;
    }


    const {availableTables, totalAvailableTables, totalAvailableSeats}= checkAvailability(date, time, numberOfPeople);

    if (availableTables.length >= Math.ceil(numberOfPeople / 4)) {
        const reservation = {
            id: reservations.length + 1,                     
            name,
            date,
            startTime: time,
            endTime: calculateEndTime(time, numberOfPeople),
            tableIds: availableTables.map(table => table.tableId),
            numberOfPeople
        };
        reservations.push(reservation);
        console.log(`Reservierung erfolgreich hinzugefügt:`, reservation);
    } else {
        if (totalAvailableTables === 0) {
            console.log(`Leider gibt es zu diesem Zeitpunkt keine freien Tische mehr.`);
        } else {
        console.log(`Leider gibt es zu diesem Zeitpunkt nur noch ${totalAvailableTables} Tische und ${totalAvailableSeats} Stühle frei.`);
        }
    }
}

// Endzeit berechnen

function calculateEndTime(startTime, numberOfPeople) {
    if (numberOfPeople >= 80) {
        return "23:59";                                         
    }
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours + 2, minutes);

    const formattedHours = String(endTime.getHours()).length === 1 ? "0" + endTime.getHours() : endTime.getHours();
    const formattedMinutes = String(endTime.getMinutes()).length === 1 ? "0" + endTime.getMinutes() : endTime.getMinutes();

    return `${formattedHours}:${formattedMinutes}`;
}

// Verfügbarkeit prüfen

function checkAvailability(date, time, numberOfPeople) {
    const neededTables = Math.ceil(numberOfPeople / 4);
    const startTime = time;
    const endTime = calculateEndTime(time, numberOfPeople);

    let availableTables = [];
    let totalAvailableTables = 0;
    let totalAvailableSeats = 0;

    for (const table of tables) {
        let isReserved = false;
        for ( const reservation of reservations) {
            if (reservation.tableIds.includes(table.tableId) && reservation.date === date && !((endTime <= reservation.startTime) || (startTime >= reservation.endTime))) {
                isReserved = true;
                break;
            }
        }
        if (!isReserved) {
            availableTables.push(table);
            totalAvailableTables++;
            totalAvailableSeats += table.seats;
        }
    }
    return {availableTables: availableTables.slice(0, neededTables), totalAvailableTables, totalAvailableSeats};
}
addReservation("Mariola", "2024-07-05", "17:30", 3);
addReservation("Ola", "2024-07-05", "17:40", 9);
addReservation("Aneta", "2024-07-05", "17:30", 48);
addReservation("klara", "2024-07-05", "17:15", 21);
addReservation("Manfred", "2024-07-05", "17:45", 7);

// Öffnungszeiten prüfen

function isWithinOpeningHours(date, time) {
    const dayOfWeekIndex = new Date(date).getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    const hours = openingHours[dayOfWeek];
    if(!hours || !hours.open || !hours.close) {
        return false;
    }
    return time >= hours.open && time <= hours.close;
}
addReservation("Maria Marianska", "2024-07-04", "16:30", 5);
addReservation("John Doe", "2024-07-04", "16:00", 6);
addReservation("herbert", "2024-07-04", "18:10", 4);
addReservation("Julia", "2024-07-05", "11:00", 5);
addReservation("Felix", "2024-07-07", "10:15", 2);

// Aktuelles Datum und Uhrzeit prüfen

function isInPast(date, time) {
    const now = new Date();
    const reservationDate = new Date(`${date} ${time}`);
    return reservationDate < now;
}

// Reservierungen anzeigen

function showReservations() {
    console.log(`Aktuelle Reservierungen:`);
    for (const reservation of reservations) {
        console.log(`Reservierung ${reservation.id}: ${reservation.name} hat die Tische ${reservation.tableIds.join(", ")} für ${reservation.numberOfPeople} Personen am ${reservation.date} von ${reservation.startTime} bis ${reservation.endTime} Uhr reserviert.`);
    }
}
showReservations();

// Reservierung aktualisieren

function updateReservation(id, newDate, newTime, newNumberOfPeople) {
    if (isInPast(newDate, newTime)) {
        console.log(`Datum oder Uhrzeit liegt in der Vergangenheit.`);
        return;
    }
    if (!isWithinOpeningHours(newDate, newTime)) {
        console.log(`Die Reservierung liegt außerhalb der Öffnungszeiten.`);
        return;
    }
    for (const reservation of reservations) {
        if (reservation.id === id) {
            reservations.splice(reservations.indexOf(reservation), 1);
            const {availableTables, totalAvailableTables, totalAvailableSeats} = checkAvailability(newDate, newTime, newNumberOfPeople);
            if (availableTables.length >= Math.ceil(newNumberOfPeople / 4)) {
                reservation.date = newDate;
                reservation.startTime = newTime;
                reservation.endTime = calculateEndTime(newTime, newNumberOfPeople);
                reservation.numberOfPeople = newNumberOfPeople;
                reservation.tableIds = availableTables.map(table => table.tableId);
                reservations.push(reservation);
                console.log(`Reservierung erfolgreich aktualisiert:`, reservation);
            } else {
                reservations.push(reservation);
                if (totalAvailableTables === 0) {
                    console.log(`Leider gibt es zu diesem Zeitpunkt keine freien Tische mehr.`);
                } else {
                    console.log(`Leider gibt es zu diesem Zeitpunkt nur noch ${totalAvailableTables} Tische und ${totalAvailableSeats} Stühle frei.`);
                }
            }
            return;
        }
    }
    
    console.log(`Reservierung nicht gefunden`);
} 

updateReservation(1, "2024-07-04", "21:30", 4);
showReservations();














