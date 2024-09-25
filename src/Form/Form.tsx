import { FC, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import "./Form.module.css";

interface FormData {
  name: string;
  email: string;
}

interface FormProps {
  handleOnSubmit: (data: FormData) => void;
}

export const Form: FC<FormProps> = ({ handleOnSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Internal submit from Form component:", data);

    handleOnSubmit(data);
  };

  const name = useWatch({ control, name: "name" });

  useEffect(() => {
    console.log("useEffect name updated", name);
  }, [name]);

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
