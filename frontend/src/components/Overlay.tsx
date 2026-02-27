interface OverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Overlay({ isOpen, onClick }: OverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
