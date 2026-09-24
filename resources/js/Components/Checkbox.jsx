export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-input text-foreground shadow-sm focus:ring-ring ' +
                className
            }
        />
    );
}
