import { useForm } from "react-hook-form"

function FormDemo() {
    const {
        register,
        handleSubmit,
        formState = { errors },
    } = useForm({ mode: "onChange" });

    const handleRegistration = (formData) => {

    }
    return (
        <div>

        </div>
    )
}

export default FormDemo