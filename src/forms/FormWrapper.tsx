import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function FormWrapper({
  title,
  description,
  children,
}: FormWrapperProps) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      {description && <p style={{ textAlign: "center" }}>{description}</p>}
      {children}
    </>
  );
}
