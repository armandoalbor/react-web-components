import { FC } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

export const Form: FC<FormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Submit data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Este campo es requerido" })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo electrónico no válido",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};
