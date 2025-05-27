import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { DatePicker } from "./DatePicker";
import { getUserVacationById, submitVacationRequest } from "../Services/vacation.service";

export default function VacationForm(){

    const {auth} = useAuth();
    const token = auth.token
    const userId = auth.id
    const [vacations, setVacations] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {

        getUserVacationById(userId, token).then(data => setVacations(data));
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (startDate && endDate) {
            const request = {
                startDate,
                endDate,
                accepted: null,
                user: { id: userId }
            };

            submitVacationRequest(request, token)
                .then(() => {
                    getUserVacationById(userId, token).then(data => setVacations(data));
                    setStartDate("");
                    setEndDate("");
                })
                .catch(err => {
                    console.error("Vacation request submission failed:", err);
                });
        }
    };

    return (
        <div>
            <div>
                <h2 className="mb-4">Złóż wniosek urlopowy</h2>
                <form onSubmit={handleSubmit} className="mb-5">
                    <DatePicker
                        label="Data rozpoczęcia:"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <DatePicker
                        label="Data zakończenia:"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Złóż wniosek</button>
                </form>
                <h3>Twoje wnioski</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-light">
                    <tr>
                        <th>Data rozpoczęcia</th>
                        <th>Data zakończenia</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vacations.map(vacation => (
                        <tr key={vacation.id}>
                            <td>{vacation.startDate}</td>
                            <td>{vacation.endDate}</td>
                            <td>{vacation.accepted === null ? "Oczekuje" : vacation.accepted ? "Zaakceptowany" : "Odrzucony"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}