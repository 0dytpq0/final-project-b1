type DrawerBackDropProps = {
  onClose: () => void;
};

function DrawerBackDrop({ onClose }: DrawerBackDropProps) {
  return (
    <div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-black/30 backdrop-blur-lg shadow-drawer z-drawer"
      onClick={onClose}
    />
  );
}

export default DrawerBackDrop;