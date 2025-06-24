"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import CTA from "@/components/cta";
import Form from "@/components/form";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import { addToWaitlist } from "@/lib/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";


export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasStartedFilling, setHasStartedFilling] = useState<boolean>(false);

  const analytics = getAnalytics();


  useEffect(()=>{
    logEvent(analytics, 'page_viewed');
  })

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    
    // Track when user starts filling the waitlist form
    if (!hasStartedFilling && event.target.value.trim() !== "") {
      setHasStartedFilling(true);
      logEvent(analytics, 'waitlist_started_filling');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    
    // Track when user starts filling the waitlist form
    if (!hasStartedFilling && event.target.value.trim() !== "") {
      setHasStartedFilling(true);
      logEvent(analytics, 'waitlist_started_filling');
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please fill in all fields 😠");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address 😠");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // First, attempt to add to Firebase
        const firebaseResult = await addToWaitlist(name, email);

        if (!firebaseResult.success) {
          reject("Firebase insertion failed");
          return;
        } else {
          // Log successful waitlist submission
          logEvent(analytics, 'waitlist_submitted', {
            user_name: name,
            user_email: email
          });
          resolve({ name });
        }
        // TODO: Add email service here
        // Turn it on when we have a proper email service


        // // Then, attempt to send the email
        // const mailResponse = await fetch("/api/mail", {
        //   cache: "no-store",
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ firstname: name, email }),
        // });

        // if (!mailResponse.ok) {
        //   if (mailResponse.status === 429) {
        //     reject("Rate limited");
        //   } else {
        //     reject("Email sending failed");
        //   }
        //   return; // Exit the promise early if mail sending fails
        // }

        // // If email sending is successful, proceed to insert into Notion
        // const notionResponse = await fetch("/api/notion", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ name, email }),
        // });

        // if (!notionResponse.ok) {
        //   if (notionResponse.status === 429) {
        //     reject("Rate limited");
        //   } else {
        //     reject("Notion insertion failed");
        //   }
        // } else {
        //   resolve({ name });
        // }

      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Getting you on the waitlist... 🚀",
      success: (data) => {
        setName("");
        setEmail("");
        return "Thank you for joining the waitlist 🎉";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "You're doing that too much. Please try again later";
        } else if (error === "Firebase insertion failed") {
          return "Failed to save to database. Please try again 😢.";
        } else if (error === "Email sending failed") {
          return "Failed to send email. Please try again 😢.";
        } else if (error === "Notion insertion failed") {
          return "Failed to save your details. Please try again 😢.";
        }
        return "An error occurred. Please try again 😢.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24 pb-12">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <Header />

        <CTA />

        <Form
          name={name}
          email={email}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />


      </section>



      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
    </main>
  );
}
