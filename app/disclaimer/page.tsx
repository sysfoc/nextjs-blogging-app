import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Important Information from Net Worth Mama Disclaimer",
  description:
    "Important information from NetWorthMama. Read our disclaimer to understand the boundaries and scope of our content policies!",
};
export default function Disclaimer() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-3xl text-white text-center capitalize'>
              Disclaimers
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2'>
              <Link href='/'>
                <span>Home / </span>
              </Link>
              <span className='capitalize'>disclaimer</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
          <div className='w-full'>
            <p className='my-2 text-gray-800 dark:text-white'>
              Welcome to Networthmama.com, your go-to source for acquiring
              information on the net worth of various celebrities and rich and
              famous from all walks of life. Before you go ahead and explore our
              website, please take a moment to review the following disclaimer.
            </p>
            <h2 className='my-3 font-bold text-2xl'>
              Accuracy of Information:
            </h2>
            <p className='my-2 text-gray-800 dark:text-white'>
              While we do our absolute best to provide accurate and up to date
              information all the time, the net worth figures presented on
              Networthmama.com are based on publicly available information,
              estimates, and calculations. We are not in a position to guarantee
              the accuracy, or reliability of the information displayed on our
              website. Net worth values may vary over time due to fluctuations
              in market conditions, changes in asset values, or newly disclosed
              financial information.
            </p>
            <h3 className='my-3 font-bold text-xl'>
              Entertainment and Informational Purposes Only:
            </h3>
            <p className='my-2 text-gray-800 dark:text-white'>
              Whatever is published on Networthmama.com is intended for
              entertainment and informational purposes only. It is not intended
              to serve as financial or investment advice. Users should not make
              financial decisions based solely on the net worth figures
              presented on this website. We recommend consulting with a
              qualified financial advisor or conducting additional research
              before making any significant financial decisions.
            </p>
            <h4 className='my-3 font-bold text-xl'>
              Reliance on Third-Party Sources:
            </h4>
            <p className='my-2 text-gray-800 dark:text-white'>
              We mostly rely on third-party sources, including but not limited
              to public records, financial disclosures, interviews, and
              reputable media outlets, to gather information about celebrities'
              net worth. However, we cannot guarantee the accuracy or
              reliability of information obtained from these sources.
            </p>
            <h5 className='my-3 font-bold text-xl'>
              Zero Endorsements or Affiliations:
            </h5>
            <p className='my-2 text-gray-800 dark:text-white'>
              The inclusion of any celebrity on Networthmama.com does not imply
              endorsement or affiliation with our website. Our mission is to
              provide unbiased information about celebrities' net worth and we
              do not endorse or promote any individual, product, or service
              featured on our platform.
            </p>
            <h5 className='my-3 font-bold text-xl'>Changes to Disclaimer:</h5>
            <p className='my-2 text-gray-800 dark:text-white'>
              Networthmama.com reserves the right to update, modify, or revise
              this disclaimer at any time without prior notice. It is your
              responsibility to review this disclaimer periodically to stay
              informed of any changes.
            </p>
            <h6 className='my-3 font-bold text-xl'>Limitation of Liability:</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              In no event shall Networthmama.com, its affiliates, partners,
              contributors, or employees be liable for any direct, indirect,
              incidental, special, or consequential damages arising out of or in
              any way connected with your use of Networthmama.com or reliance on
              the information provided, even if advised of the possibility of
              such damages.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              By accessing or using Networthmama.com, you agree to abide by this
              disclaimer. If you do not agree with any part of this disclaimer,
              you must refrain from using our website.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              If you have any questions or concerns regarding this disclaimer,
              please contact us at sysfoc@gmail.com. Thank you for choosing
              Networthmama.com for your celebrity net worth information needs.
              Enjoy exploring our website responsibly!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
