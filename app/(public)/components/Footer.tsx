import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='shadow-sm'>
      <div className='mx-4 md:mx-12'>
        <div className='flex items-center justify-between flex-wrap gap-x-6 gap-y-5 py-6'>
          <Link href="/">
            <Image
              src='/logo-no-background.png'
              alt='logo'
              width={80}
              height={50}
              className='size-auto'
              fetchPriority='high'
              priority
            />
          </Link>
          <div className='flex flex-wrap items-center gap-x-6'>
            <Link href='/about-us' className='text-sm text-gray-500 p-2'>
              About
            </Link>
            <Link href='/contact-us' className='text-sm text-gray-500 p-2'>
              Contact us
            </Link>
            <Link
              href='/terms-and-conditions'
              className='text-sm text-gray-500 p-2'
            >
              Terms
            </Link>
            <Link href='/privacy-policy' className='text-sm text-gray-500 p-2'>
              Privacy Policy
            </Link>
            <Link href='/disclaimer' className='text-sm text-gray-500 p-2'>
              Disclaimer
            </Link>
            <Link href='/advertise-with-us' className='text-sm text-gray-500 p-2'>
              Advertise with us
            </Link>
          </div>
        </div>
        <div className='border-t' />
        <div className='py-6 flex items-center justify-between gap-5 flex-wrap'>
          <div>
            <p className='text-sm text-gray-500'>
              © 2025 All rights reserved. Powered by{" "}
              <Link href='https://www.sysfoc.com' target='_blank'>
                SYSFOC
              </Link>
            </p>
          </div>
          <div className='flex items-center gap-x-6'>
            <div>
              <Link
                href='https://www.facebook.com/networthmamadotcom'
                target='_blank'
                aria-label='Facebook'
                className='p-2'
              >
                <FaFacebook size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link
                href='https://www.instagram.com/nethworthmama/'
                target='_blank'
                aria-label='Instagram'
                className='p-2'
              >
                <FaInstagram size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link href='https://x.com/networthMama' target='_blank' aria-label='Twitter' className='p-2'>
                <FaXTwitter size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link
                href='https://www.pinterest.com/networthmama/'
                target='_blank'
                aria-label='Pinterest'
                className='p-2'
              >
                <FaPinterest size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link
                href='https://www.youtube.com/@Networthmama.'
                target='_blank'
                aria-label='YouTube'
                className='p-2'
              >
                <FaYoutube size={20} className='text-gray-500' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
