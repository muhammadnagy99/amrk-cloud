import { CloseIcon } from "./icons";


type CloseBtnProps = {
    onClick: () => void;
};

export default function CloseBtn({ onClick }: CloseBtnProps) {
    return (
        <p className="w-full flex justify-end" onClick={onClick}
        >
            <CloseIcon />
        </p>
    )
}