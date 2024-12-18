import { useContext } from 'react';
import { TimersContext } from '../../views/TimerProvider';

interface DropdownProps {
    id: string;
    label: string;
    value: string | number | undefined;
    onChange: (value: string) => void;
    options: number[];
    style?: React.CSSProperties;
    placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ id, label, value, onChange, options, style, placeholder }) => {
    const { setError } = useContext(TimersContext);
    return (
        <div style={{ marginBottom: '0.5rem' }}>
            <label htmlFor={id} style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                {label}
            </label>
            <select
                id={id}
                style={{ fontSize: '0.75rem', textAlign: 'right', ...style }}
                value={value || ''}
                onChange={e => {
                    onChange(e.target.value);
                    setError(null);
                }}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
