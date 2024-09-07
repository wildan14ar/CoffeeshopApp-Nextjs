export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <button>Login/Sigin With Google</button>
    </div>
  );
}
