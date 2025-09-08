import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Increase your traffic by Advertising With Us",
  description:
    "Reach your audience by advertising your favorite celebrity net worth across, sports, business, showbiz, and more with us! Explore our advertising options today!",
};
export default function AdvertiseWithUs() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-3xl text-white text-center capitalize'>
              Increase your traffic by Advertising With Us
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2'>
              <span className='capitalize'>advertise-with-us</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
          <div className='w-full md:w-[75%]'>
            <h2 className='mb-3 font-bold text-2xl'>
              Advertise With Us and Reach Your Audience
            </h2>
            <p className='my-2 text-gray-800'>
              We provide you the exciting opportunity to connect with an engaged
              audience actively seeking celebrity net worth information on
              Networthmama.com. Undivided attention from our visitors ensures
              that your advertising message leaves a lasting impact. We help you
              enhance your product’s visibility, lead generation, and conversion
              rates.
            </p>
            <p className='my-2 text-gray-800'>
              You can choose from flexible advertising options like banner ads
              or sponsored content which is crafted to align seamlessly with
              your brand message and budget. You can reach out to our
              advertising team today to explore customized strategies that
              maximize ROI and expand your brand’s reach. You can contact us at{" "}
              <strong>sysfoc@gmail.com</strong> and our team will get in touch
              with you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
