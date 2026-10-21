import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { Link, useNavigate } from "react-router";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useForm } from "react-hook-form";

function SignUp() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");
  const passwordValid = password.length >= 8;

  const createUser = async (data) => {
    setError(null);

    try {
      const user = await authService.signup(data);

      if (user) {
        const userData = await authService.getUser();

        if (userData) {
          const serializableUser = JSON.parse(JSON.stringify(userData));

          dispatch(login({ status: true, userData: serializableUser }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(createUser)} className="space-y-5">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-text-primary">Welcome User</h1>

        <p className="mt-2 text-sm text-text-secondary">
          Create your journey on Typora.
        </p>
      </div>

      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="Akshat Verma"
        icon={<User size={18} />}
        {...register("name", {
          required: "Name is required",
        })}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="akshatvofficial@gmail.com"
        icon={<Mail size={18} />}
        autoComplete="email"
        required
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        icon={<Lock size={18} />}
        autoComplete="current-password"
        showPasswordToggle
        required
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        error={errors.password?.message}
        success={passwordValid}
      />

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-error/30 bg-error/5 px-4 py-3"
        >
          <span
            aria-hidden="true"
            className="mt-1.5 h-2 w-2 shrink-0 bg-error"
          />

          <p className="text-sm leading-5 text-error">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full">
        {isSubmitting ? "Signing up..." : "Sign up"}
      </Button>

      <div className="mt-5 flex items-center justify-between text-center">
        <p className="text-sm text-text-primary">Already have an account?</p>

        <span className="cursor-pointer text-text-secondary hover:text-primary-hover hover:underline">
          <Link to="/getin/signin">
            <span>Sign in</span>
          </Link>
        </span>
      </div>
    </form>
  );
}

export default SignUp;
