export function Card({ children, ...props }) {
  return (
    <div {...props} className="border rounded shadow-sm bg-white">
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div {...props} className="p-4">
      {children}
    </div>
  );
}
