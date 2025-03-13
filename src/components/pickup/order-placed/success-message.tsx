import { CheckCircleIcon } from "./icons";

export default function SuccessMessage() {
    return (
        <section
            role="status"
            aria-live="polite"
            className="flex flex-col items-center justify-center gap-6 p-6 rounded-lg bg-white"
        >
            <CheckCircleIcon />
            <p className="text-xl font-medium text-black text-center">
                تم استلام طلبك بنجاح!
            </p>
        </section>
    )
}
