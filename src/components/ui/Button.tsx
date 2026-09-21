import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "whatsapp" | "light";
  className?: string;
};

const styles = {
  primary: "bg-alta text-white hover:bg-wine",
  outline: "border border-wine text-wine hover:bg-wine hover:text-white",
  whatsapp: "bg-[#1a7f4b] text-white hover:bg-[#146338]",
  light: "bg-silk text-wine hover:bg-blush",
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-medium transition-colors ${styles[variant]} ${className}`;
  if (href.startsWith("http")) {
    return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  if (href.startsWith("tel:")) {
    return <a href={href} className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
}
