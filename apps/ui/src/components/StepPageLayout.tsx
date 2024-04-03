type StepPageLayoutProps = {
  children?: React.ReactNode;
};

export const StepPageLayout = ({ children }: StepPageLayoutProps) => {
  return (
    <div className="bg-black text-white min-h-screen w-screen max-w-screen p-2 flex flex-col gap-4">{children}</div>
  );
};
