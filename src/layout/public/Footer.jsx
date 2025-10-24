// src/layout/public/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-primary text-base-content mt-10">
      <div>
        <p className="font-bold text-lg text-white">
          Institut Sains dan Teknologi Terpadu Surabaya (ISTTS)
        </p>
        <p className="text-white">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <div className="grid grid-flow-row gap-2 mt-2 text-white font-semibold">
        <a href="https://istts.ac.id/" className="link link-hover">
          Homepage ISTTS
        </a>
        <a href="https://pmb.istts.ac.id/" className="link link-hover">
          Penerimaan Mahasiswa Baru ISTTS
        </a>
        <a href="https://sim.istts.ac.id/" className="link link-hover">
          Sistem Informasi Mahasiswa
        </a>
      </div>
      <div className="mt-2 flex gap-6">
        {/* <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-facebook text-xl">a</i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-twitter text-xl">a</i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-instagram text-xl">a</i>
        </a> */}
      </div>
    </footer>
  );
}
