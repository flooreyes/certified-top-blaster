interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Badge = ({ children, className = "", style = {}, ...props }: BadgeProps) => {
  const hasCustomBg = className.split(' ').some(cls => cls.startsWith('bg-'));

  return (
    <div
      className={`${!hasCustomBg ? 'bg-primary' : ''} ${className}`}
      {...props}
      style={{
        clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        borderRadius: '4px',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Badge;