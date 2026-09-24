export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            {...props}
            src="/image.png"
            alt="AMIDX Logo"
            className={className}
        />
    );
}
