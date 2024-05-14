import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

function Foot() {
  return (
    <div data-testid="footer" className='container mx-auto mb-5'>
         <Footer container className='bg-yellow-300 rounded-xl shadow-xl'>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src="Los_Pollos.webp "
              alt="Flowbite Logo"
              name="Los Pollos Hermanos"
            />
          </div>
          <div className="">
            <div>
              <Footer.Title title="Contact Us!" />
              <Footer.LinkGroup col>
                <Footer.Link href="mailto:Raeolin@live.com">Email Us!: Raeolin@live.com</Footer.Link>
                <Footer.Link href="tel:+36 30 939 9075">Call us!: +36 30 939 9075</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
            {/* <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
          </div>
        </div>
        <Footer.Divider className='border-red-500' />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright by="Los Pollos Hermanos™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/" icon={BsInstagram} />
            <Footer.Icon href="https://github.com/Hazardous-Logic/Los-Pollos-Hermanos" icon={BsGithub} />
          </div>
          <Footer.Copyright by="Taste The Family!" />
        </div>
      </div>
    </Footer>
    </div>
   
  );
}

export default Foot;