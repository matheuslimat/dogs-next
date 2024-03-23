import LoginForm from "@/components/login/login-form";

export default async function Login() {
    return (
        <section className="animeLeft">
            <h1 className="title">Login</h1>
            <LoginForm/>
        </section>
    );
}