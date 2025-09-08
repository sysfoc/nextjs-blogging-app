import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Privacy Matters to Net Worth Mama",
  description:
    "Net Worth Mama is committed to protecting your privacy and handling your information! Explore our privacy policies here.",
};
export default function PrivacyPolicy() {
  return (
    <main>
      <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
        <div className='py-16 flex items-center justify-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='font-bold text-3xl text-white text-center capitalize'>
              Privacy Policy
            </h1>
            <div className='flex justify-center items-center text-white gap-x-2'>
              <Link href='/'>
                <span>Home / </span>
              </Link>
              <span className='capitalize'>privacy-policy</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
          <div className='w-full'>
            <p className='my-2 text-gray-800 dark:text-white'>
              Our privacy policy page informs you about our policies regarding
              the collection, use, and disclosure of personal data when you use
              our service and the choices you have associated with the data.
            </p>
            <h2 className='my-3 font-bold text-2xl'>
              Introduction to Our Policy
            </h2>
            <p className='my-2 text-gray-800 dark:text-white'>
              Networthmama.com is a website owned and operated by SYSFOC and
              they are the sole proprietor and operator. Networthmama.com is
              committed to respecting the privacy rights of its visitors and
              users of this website. We created this Privacy Policy to give our
              readers confidence as they visit and use the site, and to
              demonstrate a commitment to fair information practices and the
              protection of privacy.
            </p>
            <h3 className='my-3 font-bold text-xl'>
              Information Collection Practices
            </h3>
            <p className='my-2 text-gray-800 dark:text-white'>
              The below outlines our practices when it comes to collecting
              information from the users of Networthmama.com:
            </p>
            <h4 className='my-3 font-bold text-xl'>
              What Personally Identifiable Information Do We Collect?
            </h4>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>
                Categories of Personally Identifiable Information: We collect
                personally identifiable information from you only if you sign up
                for a newsletter or contact us including:{" "}
                <strong>your name, email address, and phone number</strong>.
              </li>
              <li>
                Modification or Removal Process: Please contact us if you wish
                to modify your information.
              </li>
              <li>
                Privacy Policy Modifications and Updates: We may update and
                modify this Privacy Policy. If we modify or update the policy,
                we will post a notice on the Site for 30 days prior to the
                change going into effect.
              </li>
              <li>
                Effective Date: The effective date of this new privacy policy
                shall be March, 09, 2024.
              </li>
              <li>
                Do Not Track Signals: We do not currently honor “do not track”
                signals issued by browsers or other third party sources.
              </li>
              <li>
                Third Party Tracking: As a matter of transparency, we’ve decided
                to disclose to you whether third parties can acquire and track
                your personally identifiable information through our website.
              </li>
            </ul>
            <p className='my-2 text-gray-800 dark:text-white'>
              Google and other sites listed below can track you through this
              site as we use their services for social media, infrastructure,
              and analytical purposes; so we can optimize the user experience.
              Google participates in the NIA opt out program. You can visit this
              link to no longer be tracked by Google and Google properties such
              as Google Plus. You can also visit the following sites to read
              their privacy policies and how they track individuals across the
              web:
            </p>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
            <p className='my-2 text-gray-800 dark:text-white'>
              You can use programs such as Privacy Badger to further control the
              collection of information regarding you online.
            </p>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>
                Automatic collection: Our servers automatically recognize
                visitors’ domain names and IP addresses (the number assigned to
                computers on the Internet). No personal information about you is
                revealed in this process. Networth mama may also gather
                anonymous aggregate “traffic data” that does not personally
                identify you; but that may be helpful for marketing purposes or
                for improving the services we offer.
              </li>
              <li>
                (b) Cookies: We may use “cookies” to store a small piece of data
                on your computer during your visit to collect information. The
                cookies are used to gain information on how you use the web,
                which we try to incorporate into the Site to improve your
                experience.
              </li>
            </ul>
            <h5 className='my-3 font-bold text-xl'>We use cookies to:</h5>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>
                Identify you as a returning user and to count your visits in our
                traffic statistics analysis;
              </li>
              <li>Remember your custom display preferences</li>
              <li>Suggest any recent searches you’ve made on our site</li>
              <li>
                Other usability features include tracking whether you’ve already
                given your consent to cookies
              </li>
              <li>
                Enabling cookies from our website is not strictly necessary for
                the website to work but it will provide you with a better
                browsing experience.
              </li>
              <li>
                The cookie-related information is not used to identify you
                personally and the pattern data is fully under our control.
                These cookies are not used for any purpose other than those
                described here. There may also be other types of cookies created
                after you’ve visited our website. We use Google Analytics, a
                popular web analytics service provided by Google, Inc. Google
                Analytics uses cookies to help us to analyze how users use the
                site.
              </li>
              <li>
                The information generated by the cookie about your use of our
                website (including your IP address) will be transmitted to and
                stored by Google on servers in the United States. Google will
                use this information for the purpose of evaluating your use of
                our website; compiling reports on website activity and providing
                other services relating to website activity and internet usage.
              </li>
            </ul>
            <p className='my-2 text-gray-800 dark:text-white'>
              Google may also transfer this information to third parties where
              required to do so by law, or where such third parties process the
              information on Google’s behalf. Google undertakes not to associate
              your IP address with any other data held by Google.
            </p>
            <h5 className='my-3 font-bold text-xl'>Third-Party Advertising</h5>
            <p className='my-2 text-gray-800 dark:text-white'>
              We may have third-party advertising companies serving ads to you
              when you visit our website. These companies may store information
              about your visits to our website and to other websites in order to
              provide you with relevant advertisements about goods and services.
              These companies may employ cookies and other identifiers to gather
              information that measures advertising effectiveness.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              The information is generally not personally identifiable unless,
              for example, you provide personally identifiable information to
              them through an ad or an e-mail message.
            </p>
            <h6 className='my-3 font-bold text-xl'>
              Information About Cookies
            </h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              First party cookies are created by the website that you are
              visiting. A third-party cookie is frequently used in behavioral
              advertising and analytics and is created by a domain other than
              the website you are visiting. Third-party cookies, tags, pixels,
              beacons and other similar technologies (collectively, “Tags”) may
              be placed on the Website to monitor interaction with advertising
              content and to target and optimize advertising. Each internet
              browser has functionality so that you can block both first and
              third-party cookies and clear your browser’s cache. The “help”
              feature of the menu bar on most browsers will tell you how to stop
              accepting new cookies, how to receive notifications of new
              cookies, how to disable existing cookies, and how to clear your
              browser’s cache. For more information about cookies and how to
              disable them, you can consult the information at All about
              Cookies.
            </p>
            <h6 className='my-3 font-bold text-xl'>Indemnity and Release</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              You agree to indemnify and hold Networthmama.com and its
              affiliates harmless from any claims, damages, liabilities, costs,
              or expenses arising from your use of our service or any violation
              of these terms and conditions.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              Without cookies, you may not be able to take full advantage of the
              Website content and features. Please note that rejecting cookies
              does not mean that you will no longer see ads when you visit our
              Site. In the event you opt out, you will still see
              non-personalized advertisements on the Website.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              The Website collects the following data using a cookie when
              serving personalized ads:
            </p>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>IP Address</li>
              <li>Operating System type</li>
              <li>Operating System version</li>
              <li>Device Type</li>
              <li>Language of the website</li>
              <li>Web browser type</li>
              <li>Email (in hashed form)</li>
            </ul>
            <p className='my-2 text-gray-800 dark:text-white'>
              If you would like more information about this practice and to know
              your choices to opt-in or opt-out of this data collection, please
              visit the National Advertising Initiative opt-out page. You may
              also visit the Digital Advertising Alliance website and the
              Network Advertising Initiative website to learn more information
              about interest-based advertising. You may download the AppChoices
              app at Digital Advertising Alliance’s AppChoices app to opt-out in
              connection with mobile apps, or use the platform controls on your
              mobile device to opt out.
            </p>
            <h6 className='my-3 font-bold text-xl'>
              Information Gathered by Third Party Advertisers
            </h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              Cookies enable advertisers to learn about what ads you see, what
              ads you click, and other actions you take on our site and other
              sites. This allows advertisers to provide you with more useful and
              relevant ads. For example, if they know what ads you are shown
              while visiting our site; they can be careful not to show you the
              same ones repeatedly.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              They do not associate your interaction with unaffiliated sites
              with your identity in providing you with interest-based ads. We do
              not provide any personal information to advertisers or to third
              party sites.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              Advertisers and other third parties (including the ad networks,
              ad-serving companies, and other service providers they may use)
              may assume that users who interact with or click on a personalized
              ad or content are part of the group that the ad or content is
              directed towards (for example, readers in the Pacific Northwest
              who read certain types of articles).
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              Also, some third-party cookies may provide them with information
              about you (such as the sites where you have been shown ads or
              demographic information) from offline and online sources that they
              may use to provide you more relevant and useful advertising.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              If you would like to learn more about what options you have about
              limiting the gathering of information by third-party ad networks,
              you can consult the website of the Network Advertising Initiative.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              You can opt out of participating in interest-based advertising
              networks but opting out does not mean you will no longer receive
              online advertising. It does mean that the companies from which you
              opted out will no longer customize ads based on your interests and
              web usage patterns using cookie-based technology.
            </p>
            <h6 className='my-3 font-bold text-xl'>
              What Do We Do With Information We Collect?
            </h6>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>
                <strong>Personal information:</strong> We will not share your
                personal information with any third parties without your
                consent, except as necessary to provide you with the services
                offered by us or to comply with the law. Examples of such
                services include but are not limited to, third parties providing
                email facilitation and hosting. However, please note that if you
                leave Networth Mama and purchase a product or service we
                promote, the company you purchase from will notify us of the
                purchase as well as certain identifying information for you. We
                do not share this information with others.
              </li>
              <li>
                <strong>Anonymous information:</strong> We use anonymous
                information to analyze our website’s traffic. In addition, we
                may use anonymous IP addresses to help diagnose problems with
                our server, to administer our Site, or to display the content
                according to your preferences. Traffic and transaction
                information may also be shared with business partners and
                advertisers on an aggregate and anonymous basis. Your personal
                information will not be detailed in this aggregate data.
              </li>
              <li>
                <strong>Use of cookies:</strong> We use information obtained
                from cookies to analyze your use of the Site and to make
                appropriate adjustments.
              </li>
              <li>
                <strong>Disclosure of personal information:</strong> We may
                disclose personal information if required to do so by law or in
                the good-faith belief that such action is necessary to:
                <ul className='my-2 ml-4 text-gray-800 dark:text-white list-[arrow] list-inside'>
                  <li>
                    Conform to the edicts of the law or comply with the legal
                    process served on Networth Mama
                  </li>
                  <li>
                    Protect and defend the rights or property of Networth Mama
                    or the users of our website
                  </li>
                  <li>
                    Act under exigent circumstances to protect the safety of the
                    public or users of Networthmama.com
                  </li>
                </ul>
              </li>
              <li>
                <strong>Sale of information:</strong> In order to accommodate
                changes in our business, we may sell or buy portions of Networth
                Mama or other companies or assets, including the information
                collected through this website and from orders of our product
                including your customer information. If Networth Mama or
                substantially all of its assets are acquired by a third party,
                your personally identifiable information will be one of the
                assets transferred to the acquirer.
              </li>
              <li>
                <strong>DMCA claim disclosure:</strong> We comply with the
                Digital Millennium Copyright Act of 1998, better known as the
                “DMCA”. Should we receive a claim of copyright infringement, we
                will comply with the safe harbor requirements of the DMCA. Part
                of that compliance may require the disclosure of your identity
                if you are either the allegedly infringing party or the party
                filing the copyright infringement complaint.
              </li>
              <li>
                <strong>Sharing of information:</strong> We have agreements with
                various affiliated service providers to facilitate the
                functioning of the Website; with whom we may share the
                information we have collected. All administrative service
                providers that we use are required to have the same level of
                privacy protection as we have, and therefore we expect that your
                information will be handled with the same level of care that we
                employ. Additionally, for example, we may use analytic or
                marketing services such as Google Analytics, Google AdSense,
                Taboola, or RevContent, to which collection you hereby
                unconditionally consent.
              </li>
              <li>
                <strong>Statistical analysis:</strong> We may share Non-Personal
                Information and aggregated information with third parties,
                including but not limited to advertising or marketing purposes.
                No Personal Information will be shared in this manner.
              </li>
            </ul>
            <h6 className='my-3 font-bold text-xl'>Security</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              Networthmama.com has reasonable security measures in place such as
              Secure Sockets Layer protocols to prevent the loss, misuse, and
              alteration of the information that we obtain from you; but we make
              no assurances about our ability to prevent any such loss, or
              misuse, to you or any third party arising out of any such loss,
              misuse, or alteration.
            </p>
            <h6 className='my-3 font-bold text-xl'>Third Party Websites</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              Our website contains links to and interfaces with third party
              websites and online platforms. These websites and online platforms
              have established their own terms of use and privacy policies. You
              are encouraged to read those documents as we have no control over
              their provisions and said documents may differ greatly from our
              terms and privacy policy.
            </p>
            <h6 className='my-3 font-bold text-xl'>
              {" "}
              How to Opt Out of Interest-Based Advertising
            </h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              This website may permit third parties to collect information on
              its Site and combine that information with other information
              collected on non-affiliated websites or applications over time.
              These third parties may use technologies, including cookies and
              web beacons, to collect information about Consumers or Customers
              use of Networthmama.com. In order to analyze, report on, or
              customize content or advertising on this website or other sites,
              or to help us operate and improve the website.
            </p>
            <p className='my-2 text-gray-800 dark:text-white'>
              To find out more about interest-based advertising in the web
              environment, and how to opt-out of information collection for this
              purpose by companies that participate in the Network Advertising
              Initiative or the Digital Advertising Alliance, visit NAIís
              opt-out page or DAAís Consumer Choice Page.
            </p>
            <h6 className='my-3 font-bold text-xl'>Newsletters</h6>
            <p>
              On the Website, you may subscribe to our newsletter, which may be
              used for advertising purposes. All newsletters sent may contain
              tracking pixels. The pixel is embedded in emails and allows an
              analysis of the success of online marketing campaigns. Because of
              these tracking pixels, we may see if and when you open an email
              and which links within the email you click. Also, this allows the
              Website to adapt the content of future newsletters to the
              interests of the user. This behavior will not be passed on to
              third parties.
            </p>
            <h6 className='my-3 font-bold text-xl'>
              Rights Related to Your Personal Information
            </h6>
            <ul className='my-2 ml-4 text-gray-800 dark:text-white list-disc list-inside'>
              <li>
                <strong>Opt-out:</strong> You may opt out of future email
                communications by following the unsubscribe links in our emails.
                You may also notify us at contact@networthmama.com to be removed
                from our mailing list.
              </li>
              <li>
                <strong>Access:</strong> You may access the personal information
                we have about you by submitting a request to
                contact@networthmama.com.
              </li>
              <li>
                <strong>Amend:</strong> You may contact us at
                contact@networthmama.com to amend or update your personal
                information.
              </li>
              <li>
                <strong>Forget:</strong> In certain situations, you may request
                that we erase or forget your data. To do so, please submit a
                request to contact@networthmama.com.
              </li>
            </ul>
            <p className='my-2 text-gray-800 dark:text-white'>
              Please note that we may need to retain certain information for
              record-keeping purposes to complete transactions, or when required
              by law.
            </p>
            <h6 className='my-3 font-bold text-xl'>
              Sensitive Personal Information
            </h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              At no time should you submit sensitive personal information to the
              Website. This includes your social security number, information
              regarding race or ethnic origin, political opinions, religious
              beliefs, health information, criminal background, or trade union
              memberships. If you elect to submit such information to us, it
              will be subject to this Privacy Policy.
            </p>
            <h6 className='my-3 font-bold text-xl'>Children’s Information</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              The Website does not knowingly collect any personally identifiable
              information from children under the age of 16. If a parent or
              guardian believes that the Website has personally identifiable
              information about a child under the age of 16 in its database,
              please contact us immediately at contact@networthmama.com and we
              will use our best efforts to promptly remove such information from
              our records.
            </p>
            <h6 className='my-3 font-bold text-xl'>Contact Information</h6>
            <p className='my-2 text-gray-800 dark:text-white'>
              If you have any questions about this policy or our practices
              related to this website; please email us at
              contact@networthmama.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
