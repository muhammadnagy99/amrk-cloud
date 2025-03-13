import { ReactNode } from "react";

export interface WrapperProps {
  children: ReactNode;
}

export interface INavBar {
  text: string
}

export interface InputFieldProps {
  label: string;
  icon: React.FC;
  value: string;
}
