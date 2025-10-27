import { RouterProvider } from 'react-router-dom';
import { router } from '@/lib/router';

export default function Home() {
  return <RouterProvider router={router} />;
}