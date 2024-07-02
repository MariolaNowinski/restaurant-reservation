import rls from "readline-sync";

// Initialisierung

const tables = [];                                           // ein Array aus Objekten 
for (let i = 1; i <= 20; i++) {
    tables.push({tableId: i, seats: 4});                     // [{tableId: 1, seats: 4}, {tableId: 2, seats: 4}, ..., {tableId: 20, seat: 4}]
}
//console.log(tables);

const reservations = [];

// Reservierung hinzufügen

function addReservation(name, date, time, numberOfPeople) {
    const availableTables = checkAvailability(date, time, numberOfPeople);

    if (availableTables) {
        const reservation = {
            id: reservations.length + 1,                     // Folgereservations-id
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
        console.log(`Leider gibt es zu diesem Zeitpunkt keine freien Tische.`);
    }
}

// Endzeit berechnen

function calculateEndTime(startTime, numberOfPeople) {
    if (numberOfPeople >= 80) {
        return "23:59";                                         // ganztägige Reservierung
    }
}


