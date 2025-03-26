import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-96 p-6 border border-gray-300 shadow-md rounded-md text-center">
        {submitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Link enviado!</h2>
            <p className="text-green-600 text-lg">Verifique seu e-mail.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recuperar Senha</h2>
            <p className="text-gray-600 text-sm mb-4">
              Digite seu e-mail para receber um link de redefinição.
            </p>
            <Input
              type="email"
              placeholder="E-mail"
              className="w-full mb-4 border border-gray-300 rounded-md h-10 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-full bg-blue-500 text-white rounded-md h-10"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </>
        )}
        <a href="#" className="text-sm text-blue-500 block mt-4">Voltar ao login</a>
      </div>
    </div>
  );
}
