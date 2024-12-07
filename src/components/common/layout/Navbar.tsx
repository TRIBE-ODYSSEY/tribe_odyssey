import React, { useEffect } from 'react';

interface NavbarProps {
  setDiscordButton: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setDiscordButton: {} }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    console.log('visible : ${show}');
  }, [show]);
  return (
    <div>
      <h1>Navbar</h1>
      {show && (
        <div>
          <h2>Discord</h2>
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      )}
      {!show && <></>}
    </div>
  );
};
export default Navbar;
