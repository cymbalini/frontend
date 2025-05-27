import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { updateAcceptation, getAllVacations } from "../Services/vacation.service";

const VacationsDir = () => {
    const { auth } = useAuth();
    const token = auth.token;
    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        console.log(getAllVacations(token))
        if (token) {
            getAllVacations(token).then(data => setVacations(data));
        }
    }, [token]);

    const handleDecision = (id, isAccepted) => {
        updateAcceptation(id, isAccepted, token).then(() => {
            getAllVacations(token).then(data => setVacations(data));
        });
    };
    
    return (
        <div className="container my-4">
        <div>
            <h2 className="mb-4">Wnioski urlopowe</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                <tr>
                    <th>Imię i nazwisko</th>
                    <th>Data rozpoczęcia</th>
                    <th>Data zakończenia</th>
                    <th>Status</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {vacations
                    .filter(vacation => vacation.accepted === null)
                    .map(vacation => (
                        <tr key={vacation.id}>
                            <td>{vacation.userFullName}</td>
                            <td>{vacation.startDate}</td>
                            <td>{vacation.endDate}</td>
                            <td>
                                {vacation.accepted === null ? "Oczekuje" : vacation.accepted ? "Zaakceptowany" : "Odrzucony"}
                            </td>
                            <td>
                                <button className="btn btn-success btn-sm me-2" onClick={() => handleDecision(vacation.id, true)}>Akceptuj</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDecision(vacation.id, false)}>Odrzuć</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)
}
export default VacationsDir