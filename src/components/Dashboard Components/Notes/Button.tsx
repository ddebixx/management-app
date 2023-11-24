interface ButtonProps {
    label: string;
    onAction: () => void;
  }

export const Button = ({ label, onAction }: ButtonProps) => {
    return (
      <button onClick={onAction}>
        {label}
      </button>
    );
  };