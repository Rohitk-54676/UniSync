import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <LoginForm />
    </div>
  );
}

export default LoginPage;