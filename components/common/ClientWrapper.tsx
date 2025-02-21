'use client';

import { ReactNode } from 'react';


interface Props {
  children?: ReactNode;
}

function ClientWrapper({ children }: Props) {
  return <>{children}</>;
}

export default ClientWrapper;
