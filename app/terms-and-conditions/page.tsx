import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guidelines for Net Worth Mama Visitors",
  description:
    "Read our terms and conditions for visiting our website, NetWorthMama, to understand our rules and guidelines.",
};
export default function TermsAndConditions() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-3xl text-white text-center capitalize'>
              Terms and Conditions: Guidelines for Navigating Net Worth Mama
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2'>
              <Link href='/'>
                <span>Home / </span>
              </Link>
              <span className='capitalize'>terms-and-conditions</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
          <div className='w-full'>
            <p className='my-2 text-gray-800 dark:text-white'>
              Welcome to Networthmama.com. These terms and conditions govern
              your use of our website, online services, and software provided by
              Networthmama. By accessing or using our service, you agree to
              comply with and be bound by these terms and conditions. If you do
              not agree to these terms and conditions, please do not use our
              service.
            </p>
            <h2 className='my-3 font-bold text-2xl'>Acceptance of Terms</h2>
            <p className='my-2 text-gray-800 dark:text-white'>
              By accessing or using Networthmama.com's services, you acknowledge
              that you have read, understood, and agree to be bound by these
              terms and conditions, as well as our Privacy Policy. These terms
              and conditions apply to all users of our service.
            </p>
            <h3 className='my-3 font-bold text-xl'>Use of Content</h3>
            <p className='my-2 text-gray-800 dark:text-white'>
              The content provided on Networthmama.com is for general
              information purposes only. We do not guarantee the accuracy,
              completeness, or reliability of this information. Your use of any
              content on this website is at your own risk.
            </p>
            <h4 className='my-3 font-bold text-xl'>
              Intellectual Property Rights
            </h4>
            <p className='my-2 text-gray-800 dark:text-white'>
              All content on Networthmama.com, including but not limited to
              design, layout, graphics, and trademarks, is owned by
              Networthmama.com or licensed to us. Unauthorized use of this
              content may violate copyright laws and other intellectual property
              rights.
            </p>
            <h5 className='my-3 font-bold text-xl'>
              Links to Third-Party Websites
            </h5>
            <p className='my-2 text-gray-800 dark:text-white'>
              From time to time, Networthmama.com may contain links to
              third-party websites for your convenience. We do not endorse or
              control these websites and are not responsible for their content.
              Your use of third-party websites is at your own risk.
            </p>
            <h5 className='my-3 font-bold text-xl'>Commercial Use</h5>
            <p className='my-2 text-gray-800 dark:text-white'>
              You may not use Networthmama.com's services for any commercial
              purposes without our express written consent. This includes but is
              not limited to displaying, distributing, or selling any portion of
              our service.
            </p>
            <h6 className='my-3 font-bold text-xl'>Artificial Intelligence</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              You are prohibited from using the content on Networthmama.com for
              the development, training, or operation of artificial intelligence
              or other machine learning systems without our written consent.
            </p>
            <h6 className='my-3 font-bold text-xl'>Indemnity and Release</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              You agree to indemnify and hold Networthmama.com and its
              affiliates harmless from any claims, damages, liabilities, costs,
              or expenses arising from your use of our service or any violation
              of these terms and conditions.
            </p>
            <h6 className='my-3 font-bold text-xl'>Modification of Terms</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              Networthmama.com reserves the right to modify or update these
              terms and conditions at any time without prior notice. Your
              continued use of our service after any changes indicates your
              acceptance of the modified terms.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              If you have any questions or concerns about these terms and
              conditions, please contact us at{" "}
              <strong>advertise@networthmama.com</strong>. Thank you for using{" "}
              <strong>Networthmama.com</strong>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
