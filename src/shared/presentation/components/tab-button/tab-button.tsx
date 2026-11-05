interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

/**
 * TabButton component with glow effect for active state
 * Uses a 4-layer visual effect: background, glow, blur, and content
 */
export function TabButton({ isActive, onClick, label }: TabButtonProps) {
  return (
    <button onClick={onClick} className="relative flex-1 h-8 rounded-full overflow-hidden">
      {isActive ? (
        <>
          {/* Layer 1: Base background with opacity */}
          <div
            className="absolute inset-0 bg-card rounded-full"
            style={{
              background: 'rgba(232, 156, 122, 0.25)',
            }}
          />

          {/* Layer 2: Radial gradient glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(41.35% 43.62% at 50% 0%, #F6B58F 0%, rgba(246, 181, 143, 0) 100%)',
            }}
          />

          {/* Layer 3: Blurred glow effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              filter: 'blur(10px)',
              background: 'radial-gradient(41.35% 43.62% at 50% 0%, #F6B58F 0%, rgba(246, 181, 143, 0) 100%)',
            }}
          />

          {/* Layer 4: Content with dark background */}
          <div className="absolute inset-px bg-white dark:bg-[#121212] rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-text-primary">{label}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-sm font-medium text-text-primary/50">{label}</span>
        </div>
      )}
    </button>
  );
}
