import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "admin@example.com" || password !== "password") {
      setError("E-mail ou senha inválidos.");
    } else {
      setError("");
      alert("Login bem-sucedido!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-96 p-6 border border-gray-300 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">Login</h2>
        <Input
          type="email"
          placeholder="E-mail"
          className="w-full mb-4 border border-gray-300 rounded-md h-10 px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="w-full border border-gray-300 rounded-md h-10 px-3 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="flex justify-between mt-2">
          <a href="#" className="text-sm text-blue-500">Esqueceu a senha?</a>
          <a href="#" className="text-sm text-blue-500">Criar conta</a>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Button
          className="w-full mt-4 bg-blue-500 text-white rounded-md h-10"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
