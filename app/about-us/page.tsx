import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We provide the net worth of politicians, athletes, actors, and royals, showing their wealth, career, and personal stories. Join us to explore the net worth.",
};
export default function AboutUs() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-3xl text-white text-center capitalize'>
              About Us
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2'>
              <Link href='/'>
                <span>Home / </span>
              </Link>
              <span className='capitalize'>about-us</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
          <div className='w-full md:w-[75%]'>
            <h2 className='mb-3 font-bold text-2xl'>
              The Professional Publishing Platform
            </h2>
            <p className='my-2 text-gray-800 dark:text-white'>
              At some point in our lives, we all have wondered just how much our
              favorite stars are earning and what is the total worth of those
              living in the glitzy world of fame. If you were ever curious about
              the jaw dropping net worth of athletes, politicians, actors, or
              even royals. Well, you've landed in the right spot.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              At networthmama.com, we aim to become your go-to source for all
              wealth-related information for the rich and famous. Not only will
              you be able to get the straight answer of their total worth, but
              we aim to offer you the full scoop. We will take you on a tour to
              show their humble beginnings, mega successes, and everything in
              between.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              We understand and associate with your insatiable curiosity about
              those who grace your TV screens, sports arenas, and political
              stages. No matter if you are looking for your favorite actor, the
              most aspiring politician in your country, or the athlete with
              superhuman abilities and net worth, we got you covered.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              We also ensure that we do not just spill the beans on what they
              are worth but we also take you on a detailed tour of their whole
              career. We not only share their high points but we also take you
              for a spin through their struggles and setbacks too.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              Our major goal is to not just show you how wealthy those rich and
              famous people are but to give you a detailed tour of their
              lifestyle, struggles, and successes to inspire you while
              satisfying your curiosity.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
