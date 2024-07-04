# Pseudocode

## Datenstruktur

### Öffnungszeiten definieren 
1. 
    - erstelle ein Objekt `openingHours`, das die Öffnungs- und Schließzeiten für jeden Wochentag enthält
    - Montags ist das Restaurant geschlossen (open und close sind null) 
 

### Initialisierung

2. Tische initialisieren:
    - erstelle eine Liste `tables`mit 20 Tischen, jeder Tisch hat eine `tableId` und `seats = 4`
3. Reservierungen initialisieren:
    - erstelle eine leere Liste `reservations`für die Reservierungen

## Funktionen

### Reservierung hinzufügen

1. Funktion ` addReservation(name, date, time, numberOfPeople)`:
    - prüfe, ob die Reservierung innerhalb der Öffnungszeiten liegt, indem `isWithinOpeningHours(date, time)` aufgerufen wird
    - wenn die Reservierung außerhalb der Öffnungszeiten liegt:
        - gib eine Nachricht aus, dass die Reservierung nicht möglich ist
    - wenn die Reservierung innerhalb der Öffnungszeiten liegt:
        - rufe `checkAvailability(date, time, numberOfPeople)`auf, um verfügbare Tische zu finden
    - wenn verfügbare Tische gefuden werden:
        - berechne `endTime` basierend auf `time` und `numberOfPeople` mit `calculateEndTime(time, numberOfPeople)`
        - erstelle eine neue Reservierung mit den Attributten: `id`, `name`, `date`, `startTime`, `endTime`, `tableIds`, `numberOfPeople`
        - füge die neue Reservierung zur Liste `reservations`hinzu
        - gib eine Bestätigung aus
    - andernfalls:
        - gib eine Meldung aus, dass keine Tische verfügbar sind

### Endzeit berechnen

2. Funktion `calculateEndTime(startTime, numberOfPeople)`
    - wenn `numberOfPeople >=80`:
        - setze `endTime`auf `23:59` (ganztägige Reservierung)
    - andernfalls:
        - berechne `endTime`als `startTime + 2 Stunden` 

### Verfügbarkeit prüfen

3. Funktion `checkAvailability(date, time, numberOfPeople)`:
    - bestimme die Anzahl benötigter Tische `neededTables = numberOfPeople / 4`
    - erstelle eine leere Liste `availableTables`
    - für jeden `table`in `tables`:
        -prüfe, ob der Tisch bereits reserviert ist zu `date`und `time`durch Durchsuchen der `reservations`
        - wenn der Tisch nicht reserviert ist, füge ihn zu `availableTables` hinzu
        - wenn `availableTables` die Anzahl `neededTables` erreicht:
            - gib die benötigten Tische zurück
    - wenn nicht genügend Tische verfügbar sind:
        - gib `null` zurück

### Öffnungszeiten prüfen

4. Funktion `isWithinOpeningHours(date, time)`:
    - ermittle den Wochentag für `date`
    - hol die Öffnungs- und Schließzeiten für diesen Wochentag aus dem `openingHours`- Objekt 
    - wenn der Tag geschlossen ist oder `time` außerhalb der Öffnungs- und Schließzeiten liegt:
        - gib `false`zurück
    andernfalls:
        - gib `true`zurück

### Reservierungen anzeigen

5. Funktion `showReservations()`:
    - gib alle Reservierungen in der Liste `reservations`aus, einschließlich `name`, `tableIds`, `date`, `startTime`, `endTime`, `numberOfPeople`

### Reservierung aktualisieren

6. Funktion `updateReservation(id, newDate, newTime, newNumberOfPeople)`:
    - prüfe, ob die neue Reservierung innerhalb der Öffnungszeiten liegt, indem `isWithinOpeningHours(newDate, newTime)`aufgerufen wird
    - wenn die Reservierung außerhalb der Öffnungzeiten liegt:
        - gib eine Nachricht aus, dass die Reservierung nicht möglich ist
    - wenn die Reservierung innerhalb der Öffnungszeiten liegt:
        - suche die Reservierung mit `id` in `reservations`
        - wenn die Reservierung gefunden wird:
            - rufe `checkAvailability(newDate, newTime, newNumberOfPeople)`auf
            - wenn verfügbare Tische gefunden werden:
                - aktualisiere die Reservierung mit `newDate`, `newTime`, `calculateEndTime(newTime, newNumberOfPeople)`, `newNumberOfPeople`, `availableTables`
                - gib eine Bestätigung aus
            - andernfalls:
                - gib eine Meldung aus, dass keine Tische verfügbar sind
        - wenn die Reservierung nicht gefunden wird:
            - gib eine Fehlermeldung aus

### Reservierung löschen

7. Funktion `deleteReservation(id)`:
    - suche die Reservierung mit `id`in `reservations`
    - wenn die Reservierung gefunden wird:
        - entferne die Reservierung aus `reservations`
        - gib eine Bestätigung aus
    - wenn die Reservierung nicht gefunden wird:
        - gib eine Fehlermeldung aus

### Interaktive Benutzereingabe

8. Interaktiver Modus:
    - initialisiere eine Eingabeaufforderung
    - wiederhole:
        - frage den Benutzer nach der gewünschten Aktion (add/update/delete/show/exit)
        - für add:
            - frage nach `name`, `date`, `time`, `numberOfPeople`
            - rufe ` addReservation(name, date, time, numberOfPeople)` auf
        - für update:
            - frage nach `id`, `newDate`, `newTime`, `newNumberOfPeople`
            - rufe `updateReservation(id, newDate, newTime, newNumberOfPeople)` auf
        - für delete:
            - frage nach `id`
            - rufe `deleteReservation(id)` auf
        - für show:
            - rufe `showReservations()`auf
        - für exit:
            - beende die Eingabeaufforderung      