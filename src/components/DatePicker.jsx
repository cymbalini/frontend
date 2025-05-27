import { useRef } from 'react';

export function DatePicker({ label, value, onChange }) {
    const inputRef = useRef(null);

    const handleContainerClick = () => {
        inputRef.current.showPicker();
    };

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <div
                className="form-control"
                onClick={handleContainerClick}
                style={{ cursor: "pointer" }}
            >
                <input
                    type="date"
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    required
                    className="border-0 w-100"
                    style={{ backgroundColor: "transparent" }}
                />
            </div>
        </div>
    );
}
