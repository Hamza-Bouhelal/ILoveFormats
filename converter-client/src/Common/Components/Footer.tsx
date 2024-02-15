const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 w-full h-16 bg-primary-100" />
      <footer className="fixed bottom-0 w-full h-16 border-t-3">
        <div className="container mx-auto">
          <p className="text-center text-xs justify-center align-middle pt-5 ">
            &copy; Easy Convert {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
