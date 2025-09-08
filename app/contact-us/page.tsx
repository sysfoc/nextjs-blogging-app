import { Metadata } from "next";
import Contact from "@/app/(public)/pages/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Reach Out to Net Worth Mama",
  description:
    "Connect with Net Worth Mama. Reach out today for inquiries, feedbacks, or suggestions. We are here to help and would love to hear from you!",
};
export default function ContactUs(){
    return (
        <main>
            <Contact />
        </main>
    )
}