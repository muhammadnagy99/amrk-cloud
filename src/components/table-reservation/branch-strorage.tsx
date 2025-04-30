'use client';

import { useEffect } from 'react';

type BranchNameStorageProps = {
  branchName: string;
};

export default function BranchNameStorage({ branchName }: BranchNameStorageProps) {
  useEffect(() => {
    localStorage.setItem('table_reservation_branch_name', branchName);
  }, [branchName]);

  return null;
}