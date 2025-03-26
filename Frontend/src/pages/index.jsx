import { useState } from "react";
import { Bell, Box, FileText, LogOut, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function InventoryControl() {
  const [lowStock, setLowStock] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-5 space-y-5">
        <h2 className="text-lg font-bold">Controle de Estoque</h2>
        <nav className="space-y-4">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
            <TrendingUp /> Dashboard
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 text-white bg-blue-500">
            <Box /> Produtos
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
            <TrendingUp /> Movimentações
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
            <User /> Usuários
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
            <FileText /> Relatórios
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white p-5">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Controle de Estoque</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="text-gray-600" />
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white px-1 rounded-full">2</span>
            </div>
            <span className="text-gray-600">Bem-vindo, João (Admin)</span>
            <Button variant="ghost" className="text-gray-700"><LogOut /></Button>
          </div>
        </header>

        {/* Cadastro de Produto */}
        <Card className="p-5 mt-4">
          <h2 className="text-lg font-bold mb-3">Cadastrar Produto</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input placeholder="Nome" className="w-48" />
              <Select>
                <SelectTrigger>Selecione o tipo de madeira</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cedro">Cedro</SelectItem>
                  <SelectItem value="Pinus">Pinus</SelectItem>
                  <SelectItem value="Carvalho">Carvalho</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger>Selecione o fornecedor</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fornecedor A">Fornecedor A</SelectItem>
                    <SelectItem value="Fornecedor B">Fornecedor B</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">+ Adicionar</Button>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Input placeholder="Altura" className="w-20" />
                <Input placeholder="Largura" className="w-20" />
                <Input placeholder="Comprimento" className="w-20" />
              </div>
              <Input placeholder="Preço" className="w-48" />
              <Select>
                <SelectTrigger>Selecione a condição</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Usado">Usado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-blue-500 text-white w-32 mt-4">Cadastrar</Button>
        </Card>

        {/* Lista de Produtos */}
        <Card className="p-5 mt-5">
          <h2 className="text-lg font-bold mb-3">Lista de Produtos</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo de Madeira</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Dimensões</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque Atual</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mesa</TableCell>
                <TableCell>Cedro</TableCell>
                <TableCell>Madeiras XYZ</TableCell>
                <TableCell>80x120x50</TableCell>
                <TableCell>R$ 300,00</TableCell>
                <TableCell>5 unid.</TableCell>
                <TableCell>
                  <Button variant="ghost" className="text-blue-500">✏️</Button>
                  <Button variant="ghost" className="text-red-500">🗑️</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Alerta de Estoque Baixo */}
      {lowStock && (
        <div className="fixed bottom-4 right-4 bg-red-200 text-red-700 p-3 rounded-lg shadow-lg flex items-center justify-between w-72">
          <span>Estoque baixo: Mesa (5 unid.)</span>
          <Button variant="ghost" size="sm" onClick={() => setLowStock(false)}>X</Button>
        </div>
      )}
    </div>
  );
}
