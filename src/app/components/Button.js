export default function Button({ 
  children, 
  variant = "primary", 
  href ="https://t.me/anikvvv",
}) {
  const styles = "w-[300px] h-[48px] px-4 py-2  text-[15px] transition-all ";
  const variants = {
    primary: "bg-custom-emerald border border-black rounded-full tracking-wider text-black text-[20px] hover:bg-[#2F6459]",
  };

  return (
    <a
      href={href}
      target="_blank" // вот так правильно для новой вкладки!
      rel="noopener noreferrer"
      className={`${styles} ${variants[variant]} flex items-center justify-center no-underline`}
      style={{
        fontFamily: 'Handjet, sans-serif',
        // letterSpacing: '0.25em',
        
      }}
    >
      {children}
    </a>
  );
}
