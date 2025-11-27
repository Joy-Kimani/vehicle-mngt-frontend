import React from 'react'

const Footer:React.FC = () => {
  return (
    <div className='flex-col'>
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <p>
            McCormik Industries Ltd.
            <br />
            Providing reliable cars services since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>     
    </footer>
    <div className='p-4 mt-2 border-black-300'>
        {/* <div className="flex w-full flex-col"><div className="divider"></div></div> */}
        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
    </div>
    </div>
  )
}

export default Footer
