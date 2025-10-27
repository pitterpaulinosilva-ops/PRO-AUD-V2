import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Login } from '@/pages/Login';
import { ListarAuditorias } from '@/pages/auditorias/ListarAuditorias';
import { CadastrarAuditoria } from '@/pages/auditorias/CadastrarAuditoria';
import { DetalhesAuditoria } from '@/pages/auditorias/DetalhesAuditoria';
import { ExecucaoAuditoria } from '@/pages/execucao/ExecucaoAuditoria';
import { ListarExecucaoAuditorias } from '@/pages/execucao/ListarExecucaoAuditorias';
import { ListarChecklists } from '@/pages/checklists/ListarChecklists';
import { CadastrarChecklist } from '@/pages/checklists/CadastrarChecklist';
import { ListarNaoConformidades } from '@/pages/nao-conformidades/ListarNaoConformidades';
import { Configuracoes } from '@/pages/configuracoes/Configuracoes';
import { Relatorios } from '@/pages/relatorios/Relatorios';
import { Perfil } from '@/pages/perfil/Perfil';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'auditorias',
        element: <ListarAuditorias />,
      },
      {
        path: 'auditorias/nova',
        element: <CadastrarAuditoria />,
      },
      {
        path: 'auditorias/:id',
        element: <DetalhesAuditoria />,
      },
      {
        path: 'execucao',
        element: <ListarExecucaoAuditorias />,
      },
      {
        path: 'execucao/:id',
        element: <ExecucaoAuditoria />,
      },
      {
        path: 'checklists',
        element: <ListarChecklists />,
      },
      {
        path: 'checklists/novo',
        element: <CadastrarChecklist />,
      },
      {
        path: 'nao-conformidades',
        element: <ListarNaoConformidades />,
      },
      {
        path: 'configuracoes',
        element: <Configuracoes />,
      },
      {
        path: 'relatorios',
        element: <Relatorios />,
      },
      {
        path: 'perfil',
        element: <Perfil />,
      },
    ],
  },
]);